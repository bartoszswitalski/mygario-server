import { Module } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { AuthController } from 'src/modules/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';

@Module({
    imports: [JwtModule.register(AuthModule.JWT_OPTIONS)],
    controllers: [AuthController],
    providers: [AuthService, UsersService],
})
export class AuthModule {
    private static readonly JWT_EXPIRATION_TIME = '30m';
    private static readonly JWT_OPTIONS = {
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: AuthModule.JWT_EXPIRATION_TIME },
    };
}
