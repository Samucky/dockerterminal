import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from "class-validator";

@ArgsType()
export class StatusArgs {

    @Field(() => Int, { nullable: true, defaultValue: 0 }) // Cambiado a Int y se le da un valor predeterminado de 0
    vacunas?: number; // Cambiado el nombre del campo y su tipo a número
}
