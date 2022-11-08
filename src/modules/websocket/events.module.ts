import { Module } from '@nestjs/common';
import { EventsGateway } from 'src/modules/websocket/events.gateway';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/modules/user/users.module';

@Module({
    imports: [JwtModule, AuthModule, UsersModule],
    controllers: [],
    providers: [EventsGateway],
    exports: [],
})
export class EventsModule {}
