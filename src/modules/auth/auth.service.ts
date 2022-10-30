import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/auth/users.service';
import { JwtService } from '@nestjs/jwt';

export type Token = string;
export type TokenPayload = { sub: string };

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UsersService) {}

    login(userName: string): Token {
        this.userService.addUser(userName);
        const payload = { sub: userName };
        return this.jwtService.sign(payload);
    }
}
