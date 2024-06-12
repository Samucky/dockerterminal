import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { Todo } from './entity/todo.entity';
import { StatusArgs } from './dto/args/status.args';

@Injectable()
export class TodoService {

    private todos: Todo[] = [
        // Las primeras 20 mascotas
        { id: 1, name: 'Rocky', especie: 'Perro Labrador Retriever', dueño: 'Juan Pérez', vacunas: 3 },
        { id: 2, name: 'Luna', especie: 'Gato Persa', dueño: 'María González', vacunas: 2 },
        { id: 3, name: 'Simba', especie: 'Gato Siamés', dueño: 'Carlos Sánchez', vacunas: 1 },
        { id: 4, name: 'Nina', especie: 'Gato Maine Coon', dueño: 'Ana Martínez', vacunas: 4 },
        { id: 5, name: 'Max', especie: 'Perro Pastor Alemán', dueño: 'Laura García', vacunas: 2 },
        { id: 6, name: 'Coco', especie: 'Perro Caniche', dueño: 'Pedro López', vacunas: 1 },
        { id: 7, name: 'Pelusa', especie: 'Gato Ragdoll', dueño: 'Sofía Rodríguez', vacunas: 3 },
        { id: 8, name: 'Buddy', especie: 'Perro Golden Retriever', dueño: 'Luisa Fernández', vacunas: 2 },
        { id: 9, name: 'Milo', especie: 'Perro Bulldog Francés', dueño: 'Elena Díaz', vacunas: 4 },
        { id: 10, name: 'Miau', especie: 'Gato Británico de Pelo Corto', dueño: 'Diego Torres', vacunas: 1 },
        { id: 11, name: 'Toby', especie: 'Perro Boxer', dueño: 'Raquel Ramírez', vacunas: 3 },
        { id: 12, name: 'Gatúbela', especie: 'Gato Bengala', dueño: 'Fernando Ruiz', vacunas: 2 },
        { id: 13, name: 'Rocko', especie: 'Perro Yorkshire Terrier', dueño: 'Carla Vázquez', vacunas: 1 },
        { id: 14, name: 'Firulais', especie: 'Perro Dálmata', dueño: 'David López', vacunas: 3 },
        { id: 15, name: 'Oreo', especie: 'Gato Exótico de Pelo Corto', dueño: 'Patricia Gómez', vacunas: 2 },
        { id: 16, name: 'Chispa', especie: 'Perro Beagle', dueño: 'Roberto Martín', vacunas: 4 },
        { id: 17, name: 'Lucky', especie: 'Perro Shih Tzu', dueño: 'Esther Pérez', vacunas: 1 },
        { id: 18, name: 'Garfield', especie: 'Gato Bosque de Noruega', dueño: 'Carmen López', vacunas: 3 },
        { id: 19, name: 'Rex', especie: 'Perro Labrador Retriever', dueño: 'Javier García', vacunas: 2 },
        { id: 20, name: 'Tom', especie: 'Gato Scottish Fold', dueño: 'Natalia Martínez', vacunas: 1 },
        { id: 21, name: 'Paco', especie: 'Guacamayo', dueño: 'Miguel Hernández', vacunas: 1 },
        { id: 22, name: 'Kiwi', especie: 'Perico', dueño: 'Ana Gómez', vacunas: 0 },
        { id: 23, name: 'Boris', especie: 'Perro Rottweiler', dueño: 'Ricardo Soto', vacunas: 2 },
        { id: 24, name: 'Lola', especie: 'Gato Siamese', dueño: 'Fabiola Reyes', vacunas: 1 },
        { id: 25, name: 'Thor', especie: 'Perro Husky Siberiano', dueño: 'Adriana González', vacunas: 3 },
        { id: 26, name: 'Lucky', especie: 'Gato Persa', dueño: 'José Navarro', vacunas: 2 },
        { id: 27, name: 'Zeus', especie: 'Perro Gran Danés', dueño: 'Roberto Sánchez', vacunas: 4 },
        { id: 28, name: 'Sasha', especie: 'Perro Boxer', dueño: 'Valeria Pérez', vacunas: 2 },
        { id: 29, name: 'Cleo', especie: 'Gato Angora', dueño: 'Mario García', vacunas: 3 },
        { id: 30, name: 'Bobby', especie: 'Perro Bichón Maltés', dueño: 'Martha Gutiérrez', vacunas: 1 },
        { id: 31, name: 'Molly', especie: 'Perro Border Collie', dueño: 'Andrea Ruiz', vacunas: 2 },
        { id: 32, name: 'Coco', especie: 'Perro Pug', dueño: 'Arturo López', vacunas: 1 },
        { id: 33, name: 'Nico', especie: 'Gato Maine Coon', dueño: 'Elena Díaz', vacunas: 4 },
        { id: 34, name: 'Lola', especie: 'Gato Persa', dueño: 'Sandra Jiménez', vacunas: 2 },
        { id: 35, name: 'Charlie', especie: 'Perro Beagle', dueño: 'Pedro Reyes', vacunas: 3 },
        { id: 36, name: 'Toby', especie: 'Perro Bulldog', dueño: 'Sara Martínez', vacunas: 2 },
        { id: 37, name: 'Sasha', especie: 'Gato Ragdoll', dueño: 'Alejandro González', vacunas: 1 },
        { id: 38, name: 'Thor', especie: 'Perro Husky Siberiano', dueño: 'Andrea López', vacunas: 4 },
        { id: 39, name: 'Milo', especie: 'Perro Bichón Frisé', dueño: 'Cristina Fernández', vacunas: 3 },
        { id: 40, name: 'Miau', especie: 'Gato Azul Ruso', dueño: 'Javier Rodríguez', vacunas: 2 },
        { id: 41, name: 'Fido', especie: 'Perro Rottweiler', dueño: 'María Martínez', vacunas: 3 },
        { id: 42, name: 'Whiskers', especie: 'Gato Siames', dueño: 'Luis González', vacunas: 2 },
        { id: 43, name: 'Lucky', especie: 'Perro Chihuahua', dueño: 'Ana Sánchez', vacunas: 1 },
        { id: 44, name: 'Bella', especie: 'Gato Angora', dueño: 'Roberto Pérez', vacunas: 4 },
        { id: 45, name: 'Bruno', especie: 'Perro Boxer', dueño: 'Patricia Rodríguez', vacunas: 2 },
        { id: 46, name: 'Snoopy', especie: 'Perro Poodle', dueño: 'Elena Gómez', vacunas: 3 },
        { id: 47, name: 'Tom', especie: 'Gato British Shorthair', dueño: 'Francisco Díaz', vacunas: 1 },
        { id: 48, name: 'Buddy', especie: 'Perro Golden Retriever', dueño: 'Carmen López', vacunas: 2 },
        { id: 49, name: 'Misty', especie: 'Gato Himalayo', dueño: 'Daniel Martín', vacunas: 3 },
        { id: 50, name: 'Max', especie: 'Perro Labrador Retriever', dueño: 'Isabel Ruiz', vacunas: 1 },
        { id: 51, name: 'Nala', especie: 'Gato Bombay', dueño: 'Raquel Castro', vacunas: 4 },
        { id: 52, name: 'Daisy', especie: 'Perro Beagle', dueño: 'Jorge Ramírez', vacunas: 2 },
        { id: 53, name: 'Cleo', especie: 'Gato American Shorthair', dueño: 'Lorena Torres', vacunas: 3 },
        { id: 54, name: 'Rex', especie: 'Perro Dálmata', dueño: 'Antonio Soto', vacunas: 2 },
        { id: 55, name: 'Fluffy', especie: 'Gato Maine Coon', dueño: 'Beatriz Navarro', vacunas: 1 },
        // Las próximas 35 mascotas
{ id: 56, name: 'Rocky', especie: 'Perro Labrador Retriever', dueño: 'Juan Pérez', vacunas: 3 },
{ id: 57, name: 'Luna', especie: 'Gato Persa', dueño: 'María González', vacunas: 2 },
{ id: 58, name: 'Simba', especie: 'Gato Siamés', dueño: 'Carlos Sánchez', vacunas: 1 },
{ id: 59, name: 'Charlie', especie: 'Perro Beagle', dueño: 'Pedro Reyes', vacunas: 3 },
{ id: 60, name: 'Toby', especie: 'Perro Bulldog', dueño: 'Sara Martínez', vacunas: 2 },
{ id: 61, name: 'Sasha', especie: 'Gato Ragdoll', dueño: 'Alejandro González', vacunas: 1 },
{ id: 62, name: 'Thor', especie: 'Perro Husky Siberiano', dueño: 'Andrea López', vacunas: 4 },
{ id: 63, name: 'Milo', especie: 'Perro Bichón Frisé', dueño: 'Cristina Fernández', vacunas: 3 },
{ id: 64, name: 'Miau', especie: 'Gato Azul Ruso', dueño: 'Javier Rodríguez', vacunas: 2 },
{ id: 65, name: 'Fido', especie: 'Perro Rottweiler', dueño: 'María Martínez', vacunas: 3 },
{ id: 66, name: 'Whiskers', especie: 'Gato Siames', dueño: 'Luis González', vacunas: 2 },
{ id: 67, name: 'Lucky', especie: 'Perro Chihuahua', dueño: 'Ana Sánchez', vacunas: 1 },
{ id: 68, name: 'Bella', especie: 'Gato Angora', dueño: 'Roberto Pérez', vacunas: 4 },
{ id: 69, name: 'Bruno', especie: 'Perro Boxer', dueño: 'Patricia Rodríguez', vacunas: 2 },
{ id: 70, name: 'Snoopy', especie: 'Perro Poodle', dueño: 'Elena Gómez', vacunas: 3 },
{ id: 71, name: 'Tom', especie: 'Gato British Shorthair', dueño: 'Francisco Díaz', vacunas: 1 },
{ id: 72, name: 'Buddy', especie: 'Perro Golden Retriever', dueño: 'Carmen López', vacunas: 2 },
{ id: 73, name: 'Misty', especie: 'Gato Himalayo', dueño: 'Daniel Martín', vacunas: 3 },
{ id: 74, name: 'Max', especie: 'Perro Labrador Retriever', dueño: 'Isabel Ruiz', vacunas: 1 },
{ id: 75, name: 'Nala', especie: 'Gato Bombay', dueño: 'Raquel Castro', vacunas: 4 },
{ id: 76, name: 'Daisy', especie: 'Perro Beagle', dueño: 'Jorge Ramírez', vacunas: 2 },
{ id: 77, name: 'Cleo', especie: 'Gato American Shorthair', dueño: 'Lorena Torres', vacunas: 3 },
{ id: 78, name: 'Rex', especie: 'Perro Dálmata', dueño: 'Antonio Soto', vacunas: 2 },
{ id: 79, name: 'Fluffy', especie: 'Gato Maine Coon', dueño: 'Beatriz Navarro', vacunas: 1 },
{ id: 80, name: 'Rocky', especie: 'Perro Bulldog Francés', dueño: 'Fernando López', vacunas: 2 },
{ id: 81, name: 'Loki', especie: 'Gato Persa', dueño: 'Adriana Fernández', vacunas: 3 },
{ id: 82, name: 'Milo', especie: 'Perro Husky Siberiano', dueño: 'Eduardo Ramírez', vacunas: 2 },
{ id: 83, name: 'Coco', especie: 'Gato Bengalí', dueño: 'Laura Pérez', vacunas: 4 },
{ id: 84, name: 'Toby', especie: 'Perro Beagle', dueño: 'Gonzalo García', vacunas: 3 },
{ id: 85, name: 'Simba', especie: 'Gato Persa', dueño: 'Patricia Torres', vacunas: 2 },
{ id: 86, name: 'Luna', especie: 'Perro Pastor Alemán', dueño: 'Roberto López', vacunas: 1 },
{ id: 87, name: 'Bella', especie: 'Gato Siamés', dueño: 'María Sánchez', vacunas: 3 },
{ id: 88, name: 'Max', especie: 'Perro Labrador Retriever', dueño: 'José Pérez', vacunas: 2 },
{ id: 89, name: 'Charlie', especie:'Perro Rottweiler', dueño: 'Alejandra Martínez', vacunas: 1 },
{ id: 90, name: 'Lola', especie: 'Gato Ragdoll', dueño: 'David Ramírez', vacunas: 2 },
{ id: 91, name: 'Rocky', especie: 'Perro Golden Retriever', dueño: 'Ana López', vacunas: 3 },
{ id: 92, name: 'Mia', especie: 'Gato Siamés', dueño: 'Sergio González', vacunas: 2 },
{ id: 93, name: 'Jack', especie: 'Perro Bulldog Inglés', dueño: 'Lucía Martín', vacunas: 4 },
{ id: 94, name: 'Luna', especie: 'Gato Persa', dueño: 'Manuel Sánchez', vacunas: 3 },
{ id: 95, name: 'Max', especie: 'Perro Pastor Alemán', dueño: 'María Gómez', vacunas: 2 },
{ id: 96, name: 'Sasha', especie: 'Gato Bengalí', dueño: 'Jorge Torres', vacunas: 1 },
{ id: 97, name: 'Duke', especie: 'Perro Doberman', dueño: 'Laura Martínez', vacunas: 3 },
{ id: 98, name: 'Bella', especie: 'Gato Maine Coon', dueño: 'Carlos Fernández', vacunas: 2 },
{ id: 99, name: 'Lucky', especie: 'Perro Chihuahua', dueño: 'Patricia Ramírez', vacunas: 1 },
{ id: 100, name: 'Milo', especie: 'Gato Siames', dueño: 'María López', vacunas: 4 },
{ id: 101, name: 'Lucy', especie: 'Perro Labrador Retriever', dueño: 'David Rodríguez', vacunas: 2 },
{ id: 102, name: 'Simba', especie: 'Gato Persa', dueño: 'Carmen García', vacunas: 3 },
{ id: 103, name: 'Buddy', especie: 'Perro Pug', dueño: 'Sara Pérez', vacunas: 2 },
{ id: 104, name: 'Lola', especie: 'Gato Ragdoll', dueño: 'Javier Martín', vacunas: 3 },
{ id: 105, name: 'Rocky', especie: 'Perro Husky Siberiano', dueño: 'Ana López', vacunas: 2 },
{ id: 106, name: 'Cleo', especie: 'Gato American Shorthair', dueño: 'Diego Sánchez', vacunas: 1 },
{ id: 107, name: 'Max', especie: 'Perro Boxer', dueño: 'María Martínez', vacunas: 3 },
{ id: 108, name: 'Luna', especie: 'Gato Persa', dueño: 'Sergio Pérez', vacunas: 2 },
{ id: 109, name: 'Charlie', especie: 'Perro Beagle', dueño: 'Ana López', vacunas: 4 },
{ id: 110, name: 'Mia', especie: 'Gato Bengala', dueño: 'David Ramírez', vacunas: 3 },
{ id: 111, name: 'Rocky', especie: 'Perro Labrador Retriever', dueño: 'Laura Sánchez', vacunas: 2 },
{ id: 112, name: 'Luna', especie: 'Gato Ragdoll', dueño: 'Carlos Martínez', vacunas: 1 },
{ id: 113, name: 'Simba', especie: 'Perro Bichón Frisé', dueño: 'María González', vacunas: 3 },
{ id: 114, name: 'Toby', especie: 'Gato Siames', dueño: 'Sergio Pérez', vacunas: 2 },
{ id: 115, name: 'Misty', especie: 'Perro Bulldog Francés', dueño: 'Elena Martín', vacunas: 4 },
{ id: 116, name: 'Bella', especie: 'Gato Himalayo', dueño: 'Javier Sánchez', vacunas: 3 },
{ id: 117, name: 'Max', especie: 'Perro Labrador Retriever', dueño: 'Sara López', vacunas: 2 },
{ id: 118, name: 'Charlie', especie: 'Gato Persa', dueño: 'David Rodríguez', vacunas: 1 },
{ id: 119, name: 'Lucy', especie: 'Perro Golden Retriever', dueño: 'María Martínez', vacunas: 3 },
{ id: 120, name: 'Luna', especie: 'Gato Bengalí', dueño: 'Sergio Pérez', vacunas: 2 },
{ id: 121, name: 'Coco', especie: 'Perro Dálmata', dueño: 'Laura Martínez', vacunas: 3 },
{ id: 122, name: 'Mimi', especie: 'Gato Británico de Pelo Corto', dueño: 'Andrés Rodríguez', vacunas: 2 },
{ id: 123, name: 'Max', especie: 'Perro Bulldog Francés', dueño: 'Carmen García', vacunas: 1 },
{ id: 124, name: 'Bella', especie: 'Gato Himalayo', dueño: 'Diego Fernández', vacunas: 2 },
{ id: 125, name: 'Rocky', especie: 'Perro Rottweiler', dueño: 'Elena Sánchez', vacunas: 3 },
{ id: 126, name: 'Lola', especie: 'Gato Ragdoll', dueño: 'Fernando Pérez', vacunas: 2 },
{ id: 127, name: 'Simba', especie: 'Perro Golden Retriever', dueño: 'Gabriela Martín', vacunas: 4 },
{ id: 128, name: 'Milo', especie: 'Gato Siames', dueño: 'Héctor González', vacunas: 3 },
{ id: 129, name: 'Luna', especie: 'Perro Labrador Retriever', dueño: 'Isabel Ramírez', vacunas: 2 },
{ id: 130, name: 'Max', especie: 'Gato Persa', dueño: 'Julián López', vacunas: 1 },
{ id: 131, name: 'Charlie', especie: 'Perro Beagle', dueño: 'Karla Sánchez', vacunas: 3 },
{ id: 132, name: 'Mia', especie: 'Gato Bengala', dueño: 'Luis Rodríguez', vacunas: 2 },
{ id: 133, name: 'Rocky', especie: 'Perro Labrador Retriever', dueño: 'María González', vacunas: 1 },
{ id: 134, name: 'Luna', especie: 'Gato Ragdoll', dueño: 'Nicolás Martínez', vacunas: 4 },
{ id: 135, name: 'Simba', especie: 'Perro Golden Retriever', dueño: 'Olivia Ramírez', vacunas: 3 },
{ id: 136, name: 'Buddy', especie: 'Gato Siamés', dueño: 'Pedro López', vacunas: 2 },
{ id: 137, name: 'Daisy', especie: 'Perro Dóberman', dueño: 'Quesada Martín', vacunas: 1 },
{ id: 138, name: 'Luna', especie: 'Gato Persa', dueño: 'Ricardo Rodríguez', vacunas: 3 },
{ id: 139, name: 'Max', especie: 'Perro Husky Siberiano', dueño: 'Sofía González', vacunas: 2 },
{ id: 140, name: 'Charlie', especie: 'Gato Azul Ruso', dueño: 'Teresa Martínez', vacunas: 1 },
{ id: 141, name: 'Mia', especie: 'Perro Chihuahua', dueño: 'Ulises López', vacunas: 3 },
{ id: 142, name: 'Rocky', especie: 'Gato Bengalí', dueño: 'Vargas Sánchez', vacunas: 2 },
{ id: 143, name: 'Luna', especie: 'Perro Boxer', dueño: 'Walter Ramírez', vacunas: 1 },
{ id: 144, name: 'Simba', especie: 'Gato Ragdoll', dueño: 'Ximena López', vacunas: 3 },
{ id: 145, name: 'Max', especie: 'Perro Golden Retriever', dueño: 'Yolanda Martínez', vacunas: 2 },
{ id: 146, name: 'Charlie', especie: 'Gato Persa', dueño: 'Zamora Rodríguez', vacunas: 1 },
{ id: 147, name: 'Mia', especie: 'Perro Bichón Frisé', dueño: 'Ana Sánchez', vacunas: 3 },
{ id: 148, name: 'Rocky', especie: 'Gato Siames', dueño: 'Andrea López', vacunas: 2 },
{ id: 149, name: 'Luna', especie: 'Perro Labrador Retriever', dueño: 'Cristina Fernández', vacunas: 3 },
{ id: 150, name: 'Max', especie: 'Gato Bengalí', dueño: 'Diego Rodríguez', vacunas: 2 },
{ id: 151, name: 'Charlie', especie: 'Perro Beagle', dueño: 'Eduardo Martínez', vacunas: 1 },
{ id: 152, name: 'Mia', especie: 'Gato Ragdoll', dueño: 'Fernanda Pérez', vacunas: 3 },
{ id: 153, name: 'Rocky', especie: 'Perro Golden Retriever', dueño: 'Gabriel González', vacunas: 2 },
{ id: 154, name: 'Luna', especie: 'Gato Persa', dueño: 'Héctor Martínez', vacunas: 1 },
{ id: 155, name: 'Max', especie: 'Perro Husky Siberiano', dueño: 'Isabel López', vacunas: 3 },    
{ id: 156, name: 'Charlie', especie: 'Gato Azul Ruso', dueño: 'Javier Ramírez', vacunas: 2 },
{ id: 157, name: 'Mia', especie: 'Perro Chihuahua', dueño: 'Karina González', vacunas: 1 },
{ id: 158, name: 'Rocky', especie: 'Gato Británico de Pelo Corto', dueño: 'Luis Martínez', vacunas: 3 },
{ id: 159, name: 'Luna', especie: 'Perro Boxer', dueño: 'María Rodríguez', vacunas: 2 },
{ id: 160, name: 'Max', especie: 'Gato Ragdoll', dueño: 'Nicolás López', vacunas: 1 },
{ id: 161, name: 'Charlie', especie: 'Perro Dálmata', dueño: 'Óscar Martínez', vacunas: 3 },
{ id: 162, name: 'Mia', especie: 'Gato Himalayo', dueño: 'Paula Rodríguez', vacunas: 2 },
{ id: 163, name: 'Rocky', especie: 'Perro Rottweiler', dueño: 'Quintero López', vacunas: 1 },
{ id: 164, name: 'Luna', especie: 'Gato Ragdoll', dueño: 'Roberto Martínez', vacunas: 3 },
    { id: 165, name: 'Max', especie: 'Perro Golden Retriever', dueño: 'Sara Rodríguez', vacunas: 2 },
    { id: 166, name: 'Charlie', especie: 'Gato Siames', dueño: 'Tomás López', vacunas: 1 },
    { id: 167, name: 'Mia', especie: 'Perro Labrador Retriever', dueño: 'Ulises Martínez', vacunas: 3 },
    { id: 168, name: 'Rocky', especie: 'Gato Ragdoll', dueño: 'Víctor Rodríguez', vacunas: 2 },
    { id: 169, name: 'Luna', especie: 'Perro Bulldog', dueño: 'Walter Martínez', vacunas: 1 },
    { id: 170, name: 'Max', especie: 'Gato Persa', dueño: 'Ximena López', vacunas: 3 },
    { id: 171, name: 'Charlie', especie: 'Perro Husky Siberiano', dueño: 'Yolanda Martínez', vacunas: 2 },
    { id: 172, name: 'Mia', especie: 'Gato Bengalí', dueño: 'Zacarías Rodríguez', vacunas: 1 },
    { id: 173, name: 'Rocky', especie: 'Perro Beagle', dueño: 'Ana López', vacunas: 3 },
    { id: 174, name: 'Luna', especie: 'Gato Ragdoll', dueño: 'Bartolomé Martínez', vacunas: 2 },
    { id: 175, name: 'Max', especie: 'Perro Golden Retriever', dueño: 'Carolina Rodríguez', vacunas: 1 },
    { id: 176, name: 'Charlie', especie: 'Gato Siames', dueño: 'David López', vacunas: 3 },
    { id: 177, name: 'Mia', especie: 'Perro Labrador Retriever', dueño: 'Elena Martínez', vacunas: 2 },
    { id: 178, name: 'Rocky', especie: 'Gato Persa', dueño: 'Fernando Rodríguez', vacunas: 1 },
    { id: 179, name: 'Luna', especie: 'Perro Bulldog', dueño: 'Gabriela Martínez', vacunas: 3 },
    { id: 180, name: 'Max', especie: 'Gato Azul Ruso', dueño: 'Hugo López', vacunas: 2 },
    { id: 181, name: 'Charlie', especie: 'Perro Dálmata', dueño: 'Inés Martínez', vacunas: 1 },
    { id: 182, name: 'Mia', especie: 'Gato Bengalí', dueño: 'Juan Rodríguez', vacunas: 3 },
    { id: 183, name: 'Rocky', especie: 'Perro Beagle', dueño: 'Karen López', vacunas: 2 },
    { id: 184, name: 'Luna', especie: 'Gato Ragdoll', dueño: 'Luis Martínez', vacunas: 1 },
    { id: 185, name: 'Max', especie: 'Perro Golden Retriever', dueño: 'María Rodríguez', vacunas: 3 },
    { id: 186, name: 'Charlie', especie: 'Gato Siames', dueño: 'Nicolás López', vacunas: 2 },
    { id: 187, name: 'Mia', especie: 'Perro Labrador Retriever', dueño: 'Óscar Martínez', vacunas: 1 },
    { id: 188, name: 'Rocky', especie: 'Gato Ragdoll', dueño: 'Pedro Rodríguez', vacunas: 3 },
        { id: 189, name: 'Luna', especie: 'Perro Bulldog', dueño: 'Quintero López', vacunas: 2 },
        { id: 190, name: 'Max', especie: 'Gato Persa', dueño: 'Roberto Martínez', vacunas: 1 },
        { id: 191, name: 'Charlie', especie: 'Perro Dálmata', dueño: 'Sara Rodríguez', vacunas: 3 },
        { id: 192, name: 'Mia', especie: 'Gato Bengalí', dueño: 'Tomás López', vacunas: 2 },
        { id: 193, name: 'Rocky', especie: 'Perro Beagle', dueño: 'Víctor Rodríguez', vacunas: 1 },
        { id: 194, name: 'Luna', especie: 'Gato Ragdoll', dueño: 'Ana López', vacunas: 3 },
        { id: 195, name: 'Max', especie: 'Perro Golden Retriever', dueño: 'Bartolomé Martínez', vacunas: 2 },
        { id: 196, name: 'Charlie', especie: 'Gato Siames', dueño: 'Carolina Rodríguez', vacunas: 1 },
        { id: 197, name: 'Mia', especie: 'Perro Labrador Retriever', dueño: 'David López', vacunas: 3 },
        { id: 198, name: 'Rocky', especie: 'Gato Persa', dueño: 'Elena Martínez', vacunas: 2 },
        { id: 199, name: 'Luna', especie: 'Perro Bulldog', dueño: 'Fernando Rodríguez', vacunas: 1 },
        { id: 200, name: 'Max', especie: 'Gato Azul Ruso', dueño: 'Gabriela Martínez', vacunas: 3 },
        { id: 201, name: 'Charlie', especie: 'Perro Dálmata', dueño: 'Hugo López', vacunas: 2 },
        { id: 202, name: 'Mia', especie: 'Gato Bengalí', dueño: 'Inés Martínez', vacunas: 1 },
        { id: 203, name: 'Rocky', especie: 'Perro Beagle', dueño: 'Juan Rodríguez', vacunas: 3 },
        { id: 204, name: 'Luna', especie: 'Gato Ragdoll', dueño: 'Karen López', vacunas: 2 },
        { id: 205, name: 'Max', especie: 'Perro Golden Retriever', dueño: 'Luis Martínez', vacunas: 1 },
        { id: 206, name: 'Charlie', especie: 'Gato Siames', dueño: 'María Rodríguez', vacunas: 3 },
        { id: 207, name: 'Mia', especie: 'Perro Labrador Retriever', dueño: 'Nicolás López', vacunas: 2 },
        { id: 208, name: 'Rocky', especie: 'Gato Ragdoll', dueño: 'Óscar Martínez', vacunas: 1 },
        { id: 209, name: 'Luna', especie: 'Perro Bulldog', dueño: 'Pedro Rodríguez', vacunas: 3 },
        { id: 210, name: 'Max', especie: 'Gato Persa', dueño: 'Quintero López', vacunas: 2 },
        { id: 211, name: 'Charlie', especie: 'Perro Dálmata', dueño: 'Roberto Martínez', vacunas: 1 },
        { id: 212, name: 'Mia', especie: 'Gato Bengalí', dueño: 'Sara Rodríguez', vacunas: 3 },
        { id: 213, name: 'Rocky', especie: 'Perro Beagle', dueño: 'Tomás López', vacunas: 2 },
        { id: 214, name: 'Luna', especie: 'Gato Ragdoll', dueño: 'Víctor Rodríguez', vacunas: 1 },
        { id: 215, name: 'Max', especie: 'Perro Golden Retriever', dueño: 'Ana López', vacunas: 3 },
        { id: 216, name: 'Charlie', especie: 'Gato Siames', dueño: 'Bartolomé Martínez', vacunas: 2 },
        { id: 217, name: 'Mia', especie: 'Perro Labrador Retriever', dueño: 'Carolina Rodríguez', vacunas: 1 },
        { id: 218, name: 'Rocky', especie: 'Gato Persa', dueño: 'David López', vacunas: 3 },
        { id: 219, name: 'Luna', especie: 'Perro Bulldog', dueño: 'Elena Martínez', vacunas: 2 },
        { id: 220, name: 'Max', especie: 'Gato Azul Ruso', dueño: 'Fernando Rodríguez', vacunas: 1 },
        { id: 221, name: 'Charlie', especie: 'Perro Dálmata', dueño: 'Gabriela Martínez', vacunas: 3 },
        { id: 222, name: 'Mia', especie: 'Gato Bengalí', dueño: 'Hugo López', vacunas: 2 },
        { id: 223, name: 'Rocky', especie: 'Perro Beagle', dueño: 'Inés Martínez', vacunas: 1 },
        { id: 224, name: 'Luna', especie: 'Gato Ragdoll', dueño: 'Juan Rodríguez', vacunas: 3},
        { id: 225, name: 'Max', especie: 'Perro Golden Retriever', dueño: 'Karen López', vacunas: 3 },
        { id: 226, name: 'Charlie', especie: 'Gato Siames', dueño: 'Luis Martínez', vacunas: 2 },
        { id: 227, name: 'Mia', especie: 'Perro Labrador Retriever', dueño: 'María Rodríguez', vacunas: 1 },
        { id: 228, name: 'Rocky', especie: 'Gato Ragdoll', dueño: 'Nicolás López', vacunas: 3 },
        { id: 229, name: 'Luna', especie: 'Perro Bulldog', dueño: 'Óscar Martínez', vacunas: 2 },
        { id: 230, name: 'Max', especie: 'Gato Persa', dueño: 'Pedro Rodríguez', vacunas: 1 },
        { id: 231, name: 'Charlie', especie: 'Perro Dálmata', dueño: 'Quintero López', vacunas: 3 },
        { id: 232, name: 'Mia', especie: 'Gato Bengalí', dueño: 'Roberto Martínez', vacunas: 2 },
        { id: 233, name: 'Rocky', especie: 'Perro Beagle', dueño: 'Sara Rodríguez', vacunas: 1 },
        { id: 234, name: 'Luna', especie: 'Gato Ragdoll', dueño: 'Tomás López', vacunas: 3 },
        { id: 235, name: 'Max', especie: 'Perro Golden Retriever', dueño: 'Víctor Rodríguez', vacunas: 2 },
        { id: 236, name: 'Charlie', especie: 'Gato Siames', dueño: 'Ana López', vacunas: 1 },
        { id: 237, name: 'Mia', especie: 'Perro Labrador Retriever', dueño: 'Bartolomé Martínez', vacunas: 3 },
        { id: 238, name: 'Rocky', especie: 'Gato Persa', dueño: 'Carolina Rodríguez', vacunas: 2 },
        { id: 239, name: 'Luna', especie: 'Perro Bulldog', dueño: 'David López', vacunas: 1 },
        { id: 240, name: 'Max', especie: 'Gato Azul Ruso', dueño: 'Elena Martínez', vacunas: 3 },
        { id: 241, name: 'Charlie', especie: 'Perro Dálmata', dueño: 'Fernando Rodríguez', vacunas: 2 },
        { id: 242, name: 'Mia', especie: 'Gato Bengalí', dueño: 'Gabriela Martínez', vacunas: 1 },
        { id: 243, name: 'Rocky', especie: 'Perro Beagle', dueño: 'Hugo López', vacunas: 3 },
        { id: 244, name: 'Luna', especie: 'Gato Ragdoll', dueño: 'Inés Martínez', vacunas: 2 },
        { id: 245, name: 'Max', especie: 'Perro Golden Retriever', dueño: 'Juan Rodríguez', vacunas: 1 },
        { id: 246, name: 'Charlie', especie: 'Gato Siames', dueño: 'Karen López', vacunas: 3 },
        { id: 247, name: 'Mia', especie: 'Perro Labrador Retriever', dueño: 'Luis Martínez', vacunas: 2 },
        { id: 248, name: 'Rocky', especie: 'Gato Persa', dueño: 'María Rodríguez', vacunas: 1 },
        { id: 249, name: 'Luna', especie: 'Perro Bulldog', dueño: 'Nicolás López', vacunas: 3 },
        { id: 250, name: 'Max', especie: 'Gato Azul Ruso', dueño: 'Óscar Martínez', vacunas: 2 },
        { id: 251, name: 'Charlie', especie: 'Perro Dálmata', dueño: 'Pedro Rodríguez', vacunas: 1 },
        { id: 252, name: 'Mia', especie: 'Gato Bengalí', dueño: 'Quintero López', vacunas: 3 },
        { id: 253, name: 'Rocky', especie: 'Perro Beagle', dueño: 'Roberto Martínez', vacunas: 2 },
        { id: 254, name: 'Luna', especie: 'Gato Ragdoll', dueño: 'Sara Rodríguez', vacunas: 1 },
        { id: 255, name: 'Max', especie: 'Perro Golden Retriever', dueño: 'Tomás López', vacunas: 3 },
        { id: 256, name: 'Charlie', especie: 'Gato Siames', dueño: 'Víctor Rodríguez', vacunas: 2 },
        { id: 257, name: 'Mia', especie: 'Perro Labrador Retriever', dueño: 'Ana López', vacunas: 1 },
        { id: 258, name: 'Rocky', especie: 'Gato Persa', dueño: 'Bartolomé Martínez', vacunas: 3 },
        { id: 259, name: 'Luna', especie: 'Perro Bulldog', dueño: 'Carolina Rodríguez', vacunas: 2 },
        { id: 260, name: 'Max', especie: 'Gato Azul Ruso', dueño: 'David López', vacunas: 1 },
        { id: 261, name: 'Charlie', especie: 'Perro Dálmata', dueño: 'Elena Martínez', vacunas: 3 },
        { id: 262, name: 'Mia', especie: 'Gato Bengalí', dueño: 'Fernando Rodríguez', vacunas: 2 },
        { id: 263, name: 'Rocky', especie: 'Perro Beagle', dueño: 'Gabriela Martínez', vacunas: 1 },
        { id: 264, name: 'Luna', especie: 'Gato Ragdoll', dueño: 'Hugo López', vacunas: 3 },
        { id: 265, name: 'Max', especie: 'Perro Golden Retriever', dueño: 'Inés Martínez', vacunas: 2 },
        { id: 266, name: 'Charlie', especie: 'Gato Siames', dueño: 'Juan Rodríguez', vacunas: 1 },
        { id: 267, name: 'Mia', especie: 'Perro Labrador Retriever', dueño: 'Karen López', vacunas: 3 },
        { id: 268, name: 'Rocky', especie: 'Gato Persa', dueño: 'Luis Martínez', vacunas: 2 },
        { id: 269, name: 'Luna', especie: 'Perro Bulldog', dueño: 'María Rodríguez', vacunas: 1 },
        { id: 270, name: 'Max', especie: 'Gato Azul Ruso', dueño: 'Nicolás López', vacunas: 3 },
        { id: 271, name: 'Charlie', especie: 'Perro Dálmata', dueño: 'Óscar Martínez', vacunas: 2 },
        { id: 272, name: 'Mia', especie: 'Gato Bengalí', dueño: 'Pedro Rodríguez', vacunas: 1 },
        { id: 273, name: 'Rocky', especie: 'Perro Beagle', dueño: 'Quintero López', vacunas: 3 },
        { id: 274, name: 'Luna', especie: 'Gato Ragdoll', dueño: 'Roberto Martínez', vacunas: 2 },
        { id: 275, name: 'Max', especie: 'Perro Golden Retriever', dueño: 'Sara Rodríguez', vacunas: 1 },
        { id: 276, name: 'Charlie', especie: 'Gato Siames', dueño: 'Tomás López', vacunas: 3 },
        { id: 277, name: 'Mia', especie: 'Perro Labrador Retriever', dueño: 'Víctor Rodríguez', vacunas: 2 },
        { id: 278, name: 'Rocky', especie: 'Gato Persa', dueño: 'Ana López', vacunas: 1 },
        { id: 279, name: 'Luna', especie: 'Perro Bulldog', dueño: 'Bartolomé Martínez', vacunas: 3 },
        { id: 280, name: 'Luna', especie: 'Perro Dálmata', dueño: 'David López', vacunas: 2 },
        { id: 281, name: 'Max', especie: 'Gato Siames', dueño: 'Elena Martínez', vacunas: 1 },
        { id: 282, name: 'Charlie', especie: 'Perro Bulldog', dueño: 'Fernando Rodríguez', vacunas: 3 },
        { id: 283, name: 'Mia', especie: 'Gato Ragdoll', dueño: 'Gabriela Martínez', vacunas: 2 },
        { id: 284, name: 'Rocky', especie: 'Perro Beagle', dueño: 'Hugo López', vacunas: 1 },
        { id: 285, name: 'Luna', especie: 'Gato Persa', dueño: 'Inés Martínez', vacunas: 3 },
        { id: 286, name: 'Max', especie: 'Perro Labrador Retriever', dueño: 'Juan Rodríguez', vacunas: 2 },
        { id: 287, name: 'Charlie', especie: 'Gato Bengalí', dueño: 'Karen López', vacunas: 1 },
        { id: 288, name: 'Mia', especie: 'Perro Golden Retriever', dueño: 'Luis Martínez', vacunas: 3 },
        { id: 289, name: 'Rocky', especie: 'Gato Azul Ruso', dueño: 'María Rodríguez', vacunas: 2 },
        { id: 290, name: 'Luna', especie: 'Perro Dálmata', dueño: 'Nicolás López', vacunas: 1 },
        { id: 291, name: 'Max', especie: 'Gato Siames', dueño: 'Óscar Martínez', vacunas: 3 },
        { id: 292, name: 'Charlie', especie: 'Perro Bulldog', dueño: 'Pedro Rodríguez', vacunas: 2 },
        { id: 293, name: 'Mia', especie: 'Gato Ragdoll', dueño: 'Quintero López', vacunas: 1 },
        { id: 294, name: 'Rocky', especie: 'Perro Beagle', dueño: 'Roberto Martínez', vacunas: 3 }






        


    ];
    

    get totalTodos() {
        return this.todos.length;
    }

    get pendingTodos() {
        return this.todos.filter( todo => todo.vacunas = 0 ).length;
    }

    get completedTodos() {
        return this.todos.filter( todo => todo.vacunas > 0 ).length;
    }



    findAll(  statusArgs: StatusArgs ): Todo[] {
        
        const { vacunas } = statusArgs;
        if( vacunas !== undefined ) return this.todos.filter( todo => todo.vacunas >= vacunas );
        
        return this.todos;
    }

    findOne( id: number ): Todo {

        const todo = this.todos.find( todo => todo.id === id );

        if ( !todo ) throw new NotFoundException(`Todo with id ${ id } not found`);

        return todo;
    }
    create(createTodoInput: CreateTodoInput): Todo {
        const todo = new Todo();
        todo.id = Math.max(...this.todos.map(todo => todo.id), 0) + 1;
        todo.name = createTodoInput.name;
        todo.especie = createTodoInput.especie;
        todo.dueño = createTodoInput.dueño;
        todo.vacunas = createTodoInput.vacunas;
    
        this.todos.push(todo);
    
        return todo;
    }
    

    update(id: number, updateTodoInput: UpdateTodoInput): Todo {
        const { name, especie, dueño, vacunas } = updateTodoInput;
        const todoToUpdate = this.findOne(id);
    
        if (name !== undefined) todoToUpdate.name = name;
        if (especie !== undefined) todoToUpdate.especie = especie;
        if (dueño !== undefined) todoToUpdate.dueño = dueño;
        if (vacunas !== undefined) todoToUpdate.vacunas = vacunas;
    
        this.todos = this.todos.map(todo => {
            return todo.id === id ? todoToUpdate : todo;
        });
    
        return todoToUpdate;
    }
    

    delete( id: number ):Boolean {
        const todo = this.findOne( id );

        this.todos = this.todos.filter( todo => todo.id !== id );

        return true;
    }



}
