import { IsEmail, IsNotEmpty, isNotEmpty, IsString } from "class-validator";
import { SrvRecord } from "dns";

export class CreateOngDto {
    @IsNotEmpty({message:'nome'})
    @IsString()    
    readonly nome: string
    @IsNotEmpty({message:'CNPJ'})
    readonly CNPJ: string
    @IsNotEmpty({message:'telefone'})
    readonly telefone: string
    @IsNotEmpty({message:'email'})
    @IsEmail()
    readonly email: string
}
