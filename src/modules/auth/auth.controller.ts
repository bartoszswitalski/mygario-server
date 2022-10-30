import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, Token } from 'src/modules/auth/auth.service';

@Controller('')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('auth/login')
    login(@Body() requestBody: { userName: string }): Token {
        return this.authService.login(requestBody.userName);
    }
}
