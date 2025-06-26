import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAnimaiDto {
    @IsNotEmpty({ message: 'especie' })
    @IsString()
    readonly especie: string
    @IsNotEmpty({ message: 'nome' })
    @IsString()
    readonly nome: string
    @IsNotEmpty({ message: 'data_nascimento' })
    readonly data_nascimento: Date
    @IsNotEmpty({ message: 'porte' })
    @IsString()
    readonly porte: string
    @IsNotEmpty({ message: 'sexo' })
    @IsString()
    readonly sexo: string
    @IsNotEmpty({ message: 'descricao' })
    @IsString()
    readonly descricao: string
    @IsNotEmpty({ message: 'idOng' })
    @IsNumber()
    readonly idOng: number





}
