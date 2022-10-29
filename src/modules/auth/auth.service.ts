import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/auth/users.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { JwtService } from '@nestjs/jwt';

export type Token = string;
export type TokenPayload = { sub: string };

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UsersService) {}

    login(loginDto: LoginDto): Token {
        this.userService.addUser(loginDto.userName);
        const payload = { sub: loginDto.userName };

        return this.jwtService.sign(payload);
    }
}
