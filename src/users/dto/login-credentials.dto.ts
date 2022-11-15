import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginCredentials {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}