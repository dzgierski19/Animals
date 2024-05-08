import { z } from 'zod';
import { ANIMALTYPE, AnimalType } from '../../../db/types';
import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

//1

export const createAnimalSchema = z.object({
  name: z.string().min(3),
  type: z.nativeEnum(ANIMALTYPE),
});

export type CreateAnimalDto = z.infer<typeof createAnimalSchema>;

export const createAnimalsSchema = z.array(
  z.object({
    name: z.string().min(3),
    type: z.nativeEnum(ANIMALTYPE),
  }),
);

export type CreateAnimalsDto = z.infer<typeof createAnimalsSchema>;

export const updateAnimalSchema = z.object({
  name: z.string().min(3).optional(),
  type: z.nativeEnum(ANIMALTYPE).optional(),
});

export type UpdateAnimalDto = z.infer<typeof updateAnimalSchema>;

export const paginationSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
});

export type PaginationDto = z.infer<typeof paginationSchema>;

//2

export class CreateAnimal {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEnum(Object.values(ANIMALTYPE), { message: 'Valid type required' })
  type: AnimalType;
}

export class UpdateAnimal extends PartialType(CreateAnimal) {}
