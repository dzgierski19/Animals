import { Injectable } from '@nestjs/common';
import { Animal, AnimalToCreate } from './../../db/types';
import { db } from './../../db/database';

export interface IDatabaseService {
  getAll(): Promise<Animal[]>;
  addOne(animal: AnimalToCreate): Promise<void>;
  addMoreThanOne(animals: AnimalToCreate[]): Promise<void>;
  getOne(animalId: string): Promise<Animal | undefined>;
  deleteOne(animalId: string): Promise<void>;
  updateInfo(animalId: string, data: Partial<AnimalToCreate>): Promise<void>;
}

@Injectable()
export class DatabaseService implements IDatabaseService {
  async getAll(): Promise<Animal[]> {
    const animals = await db.select().table('animals').whereNull('deletedAt');
    return animals;
  }

  async addOne(animal: AnimalToCreate): Promise<void> {
    await db<Animal>('animals').insert(animal);
  }

  async addMoreThanOne(animals: AnimalToCreate[]): Promise<void> {
    animals.forEach(async (element) => await this.addOne(element));
  }

  async getOne(animalId: string): Promise<Animal | undefined> {
    const animal = await db
      .select()
      .table('animals')
      .where({ id: animalId })
      .whereNull('deletedAt');
    return animal[0];
  }

  async deleteOne(animalId: string): Promise<void> {
    await db<Animal>('animals')
      .where({ id: animalId })
      .whereNull('deletedAt')
      .update({ deletedAt: new Date() });
    // const animal = await this.getOne(animalId);
    // console.log(animal);
  }

  async updateInfo(
    animalId: string,
    data: Partial<AnimalToCreate>,
  ): Promise<void> {
    await db<Animal>('animals')
      .where({ id: animalId })
      .whereNull('deletedAt')
      .update(data);
    // const animal = await this.getOne(animalId);
    // console.log(animal);
  }
}
