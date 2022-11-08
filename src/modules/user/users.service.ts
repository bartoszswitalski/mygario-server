import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
    private static readonly MAX_USERS = 10;
    #users: Map<string, User>;

    constructor() {
        this.#users = new Map();
    }

    createUser(userName: string): User {
        return {
            name: userName,
            position: { x: 0, y: 0 },
            size: 30,
            color: this._getRandomColor(),
        };
    }

    addUser(newUserId: string, newUser: User): void {
        if (this.#users.size === UsersService.MAX_USERS) {
            throw new BadRequestException('Maximum number of users reached');
        }

        if (Array.from(this.#users.values()).some((user) => user.name === newUser.name)) {
            throw new BadRequestException('This user already exists');
        }
        this.#users.set(newUserId, newUser);
    }

    deleteUser(userId: string): void {
        this.#users.delete(userId);
    }

    getUser(userId: string): User {
        if (!this.#users.has(userId)) {
            throw new BadRequestException('This user does not exist');
        }
        return this.#users.get(userId);
    }

    getAllUsers(): User[] {
        return Array.from(this.#users.values());
    }

    _getRandomColor(): number {
        return Math.floor(Math.random() * 16777215);
    }
}
