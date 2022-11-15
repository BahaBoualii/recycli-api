import { CitiesEnum } from "src/enums/cities.enum";
import { IndusTypeEnum } from "src/enums/indus.type.enum";
import { RolesEnum } from "src/enums/roles.enum";

export class CreateUserDto {
    
    readonly name: string;
    
    readonly email: string;

    readonly number: number;

    readonly role: RolesEnum;

    readonly city: CitiesEnum;

    readonly address: string;

    readonly company_name: string;

    readonly indus_type: IndusTypeEnum;

    readonly password: string;
    
}
