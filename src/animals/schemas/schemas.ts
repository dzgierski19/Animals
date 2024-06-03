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
  query: z.object({
    limit: z.coerce.number().default(5).optional(),
    page: z.coerce.number().default(1).optional(),
  }),
});

export type PaginationDto = z.infer<typeof paginationSchema>;

export const stringToNumberSchema = z.coerce.number().positive().optional();
export type stringToNumberType = z.infer<typeof stringToNumberSchema>;
