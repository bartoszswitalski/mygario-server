import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @Length(5, 15)
    userName: string;
}
