import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Todo {
    @Field( () => Int )
    id: number;

    @Field( () => String )
    name: string;

    @Field( () => String )
    especie: string;

    @Field( () => String )
    dueño: string;

    @Field( () => Int )
    vacunas: number;
}

