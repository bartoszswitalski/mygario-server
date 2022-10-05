import { Module } from '@nestjs/common';
import { EventsGateway } from 'src/modules/websocket/events.gateway';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';

@Module({
    imports: [AuthModule, JwtModule],
    controllers: [],
    providers: [EventsGateway, UsersService],
})
export class AppModule {}
