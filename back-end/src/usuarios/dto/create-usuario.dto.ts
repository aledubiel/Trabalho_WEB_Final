import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUsuarioDto {
    @IsNotEmpty({message:'nome'})
    @IsString()
    readonly nome: string
    @IsEmail()
    @IsNotEmpty({message:'email'})
    readonly email: string
    @IsNotEmpty({message:'senha'})
    readonly senha: string
    @IsNotEmpty({message:'idOng'})
    @IsNumber()
    readonly idOng: number
}
