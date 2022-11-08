import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { UsersService } from 'src/modules/user/users.service';

config();

@Module({
    imports: [],
    controllers: [],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
