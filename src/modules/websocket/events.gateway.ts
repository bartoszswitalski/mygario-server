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
import { TokenPayload } from 'src/modules/auth/auth.service';
import { MovePlayerMessage } from 'src/modules/websocket/messages/player-move-player.message';
import { GrowPlayerMessage } from 'src/modules/websocket/messages/player-grow-player.message';
import { NewPlayerMessage } from 'src/modules/websocket/messages/player-new-player.message';
import { RemovePlayerMessage } from 'src/modules/websocket/messages/player-lose.message';

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    #logger: Logger = new Logger('EventsGateway');

    constructor(private readonly jwtService: JwtService) {}

    handleNewPlayer(message: NewPlayerMessage): void {
        this.server.emit('newPlayerToClient', message);
    }

    @SubscribeMessage('movePlayerToServer')
    handlePlayerMove(@ConnectedSocket() client: Socket, @MessageBody() message: MovePlayerMessage): void {
        this.server.emit('playerMoveToClient', message);
    }

    @SubscribeMessage('growPlayerToServer')
    handlePlayerGrow(@ConnectedSocket() client: Socket, @MessageBody() message: GrowPlayerMessage): void {
        this.server.emit('growPlayerToClient', message);
    }

    @SubscribeMessage('removePlayerToServer')
    handleRemovePlayer(@ConnectedSocket() client: Socket, @MessageBody() message: RemovePlayerMessage): void {
        this.server.emit('removePlayerToClient', message);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    afterInit(server: Server) {
        this.#logger.log('init');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleConnection(client: Socket, ...args: any[]) {
        const token = client.handshake.query.token as string;
        let decodedPayload: TokenPayload;
        try {
            decodedPayload = this.jwtService.verify(token);
        } catch (e) {
            client.emit('Unauthorized');
            client.disconnect();
        }

        this.#logger.log(`Client connected: ${client.id}`);
        client.broadcast.emit('connectionMessage', `${decodedPayload.sub} connected`);
    }

    handleDisconnect(client: Socket) {
        // todo: remove player on disconnect
        this.#logger.log(`Client disconnected: ${client.id}`);
    }
}
