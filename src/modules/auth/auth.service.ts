import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export type Token = string;
export type TokenPayload = { sub: string };

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    login(userName: string): Token {
        const payload = { sub: userName };
        return this.jwtService.sign(payload);
    }
}
