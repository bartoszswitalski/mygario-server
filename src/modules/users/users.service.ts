import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
    private static readonly MAX_USERS = 2;
    private _users: User[];

    constructor() {
        this._users = [];
    }

    addUser(userName: string) {
        if (this._users.length === UsersService.MAX_USERS) {
            throw new BadRequestException('Maximum number of users reached');
        }

        if (this._users.some((user) => user.name === userName)) {
            throw new BadRequestException('User of this name already exists');
        }

        this._users.push({ name: userName });
    }

    deleteUser(userName: string) {
        this._users = this._users.filter((user) => user.name !== userName);
    }
}
