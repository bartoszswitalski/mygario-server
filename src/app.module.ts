import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { EventsModule } from 'src/modules/websocket/events.module';

@Module({
    imports: [AuthModule, JwtModule, EventsModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
