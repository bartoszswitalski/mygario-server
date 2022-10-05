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
import { Coords } from 'src/types/coords.type';

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('EventsGateway');

    constructor(private readonly jwtService: JwtService) {}

    @SubscribeMessage('newPlayerToServer')
    handleNewPlayer(@ConnectedSocket() client: Socket, @MessageBody() playerName: string): void {
        this.server.emit('newPlayerToClient', playerName);
    }

    @SubscribeMessage('playerMoveToServer')
    handlePlayerMove(@ConnectedSocket() client: Socket, @MessageBody() coords: Coords) {
        this.server.emit('playerMoveToClient', coords);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    afterInit(server: Server) {
        this.logger.log('init');
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

        this.logger.log(`Client connected: ${client.id}`);
        client.broadcast.emit('connectionMessage', `${decodedPayload.sub} connected`);
    }

    handleDisconnect(client: Socket) {
        const token = client.handshake.query.token as string;
        this.logger.log(`Client disconnected: ${client.id}`);
    }
}
