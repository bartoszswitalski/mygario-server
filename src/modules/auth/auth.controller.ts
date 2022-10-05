import { Controller, Post, Request } from '@nestjs/common';
import { AuthService, Token } from 'src/modules/auth/auth.service';

@Controller('')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('auth/login')
    login(@Request() req): Token {
        return this.authService.login(req.user);
    }
}
