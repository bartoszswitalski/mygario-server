import { Module } from '@nestjs/common';
import { EventsGateway } from 'src/modules/websocket/events.gateway';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [JwtModule],
    controllers: [],
    providers: [EventsGateway],
})
export class EventsModule {}
