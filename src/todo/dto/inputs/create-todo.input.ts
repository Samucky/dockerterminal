import { Field, InputType, Int} from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';


@InputType()
export class CreateTodoInput {

    @Field(() => Int)
    id: number;

    @Field(() => String, { description: 'Name of the todo item' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    name: string;

    @Field(() => String, { description: 'Species of the todo item' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    especie: string;

    @Field(() => String, { description: 'Owner of the todo item' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    dueño: string;

    @Field(() => Int, { description: 'Number of vaccines for the todo item' })
    @IsNotEmpty()
    vacunas: number;


}