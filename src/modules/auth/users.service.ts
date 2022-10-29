import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
    private static readonly MAX_USERS = 2;
    #users: Map<string, User>;

    constructor() {
        this.#users = new Map();
    }

    addUser(userName: string): void {
        if (this.#users.size === UsersService.MAX_USERS) {
            throw new BadRequestException('Maximum number of users reached');
        }

        if (this.#users.has(userName)) {
            throw new BadRequestException('User of this name already exists');
        }

        this.#users.set(userName, { name: userName, position: { x: 0, y: 0 }, size: 1 });
    }

    deleteUser(userName: string): void {
        this.#users.delete(userName);
    }
}
