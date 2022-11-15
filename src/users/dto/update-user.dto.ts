import { PartialType } from '@nestjs/mapped-types';
import { CitiesEnum } from 'src/enums/cities.enum';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    
    readonly name: string;
    
    readonly email: string;

    readonly number: number;

    readonly city: CitiesEnum;

    readonly address: string;

}
