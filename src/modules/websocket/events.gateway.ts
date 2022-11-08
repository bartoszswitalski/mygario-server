import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token, TokenPayload } from 'src/modules/auth/auth.service';
import { MovePlayerMessage } from 'src/modules/websocket/messages/player-move-player.message';
import { GrowPlayerMessage } from 'src/modules/websocket/messages/player-grow-player.message';
import { ClientToServerMessage, ServerToClientMessage } from 'src/modules/websocket/events-gateway.model';
import { UsersService } from 'src/modules/user/users.service';

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    #logger: Logger = new Logger('EventsGateway');

    constructor(private readonly _jwtService: JwtService, private readonly _usersService: UsersService) {}

    @SubscribeMessage(ClientToServerMessage.MovePlayerToServer)
    handlePlayerMove(@ConnectedSocket() client: Socket, @MessageBody() message: MovePlayerMessage): void {
        client.broadcast.emit(ServerToClientMessage.MovePlayerToClient, message);
    }

    handlePlayerGrow(@ConnectedSocket() client: Socket, @MessageBody() message: GrowPlayerMessage): void {
        this.server.emit(ServerToClientMessage.GrowPlayerToClient, message);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    afterInit(server: Server): void {
        this.#logger.log('init');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleConnection(client: Socket, ...args: any[]): void {
        const token = client.handshake.query.token as Token;
        let decodedPayload: TokenPayload;
        try {
            decodedPayload = this._jwtService.verify(token, { secret: process.env.JWT_SECRET });
        } catch (e) {
            client.emit('Unauthorized');
            client.disconnect();
        }

        this.#logger.log(`Client connected. Id: ${client.id} userName: ${decodedPayload.sub}`);

        const existingUsers = this._usersService.getAllUsers();
        existingUsers.forEach((user) => {
            client.emit(ServerToClientMessage.NewPlayerToClient, {
                userName: user.name,
                position: user.position,
                color: user.color,
                size: user.size,
            });
        });

        const newUser = this._usersService.createUser(decodedPayload.sub);
        this._usersService.addUser(client.id, newUser);
        client.broadcast.emit(ServerToClientMessage.NewPlayerToClient, {
            userName: newUser.name,
            position: newUser.position,
            color: newUser.color,
            size: newUser.size,
        });
    }

    handleDisconnect(client: Socket): void {
        this.#logger.log(`Client disconnected. Id: ${client.id}`);
        const { name: userName } = this._usersService.getUser(client.id);
        client.broadcast.emit(ServerToClientMessage.RemovePlayerToClient, { userName });
        this._usersService.deleteUser(client.id);
    }
}
