import { Inject, Injectable } from '@nestjs/common';
import { Animal, AnimalToCreate } from './../../db/types';
import { developmentDb, testDb } from './../../db/database';
import { Knex } from 'knex';

export interface IDatabaseAdapter {
  getAll(): Promise<Animal[]>;
  addOne(animal: AnimalToCreate): Promise<void>;
  // addMoreThanOne(animals: AnimalToCreate[]): Promise<void>;
  getOne(animalId: string): Promise<Animal | undefined>;
  deleteOne(animalId: string): Promise<void>;
  updateInfo(animalId: string, data: Partial<AnimalToCreate>): Promise<void>;
}

@Injectable()
export class AnimalsDatabaseAdapter implements IDatabaseAdapter {
  readonly db: Knex;

  constructor() {
    // console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'testing') {
      this.db = testDb;
    } else {
      this.db = developmentDb;
    }
  }

  async getAll(): Promise<Animal[]> {
    const animals = await this.db
      .select()
      .table('animals')
      .whereNull('deletedAt');
    return animals;
  }

  async addOne(animal: AnimalToCreate): Promise<void> {
    await this.db<Animal>('animals').insert(animal);
  }

  async addMoreThanOne(animals: AnimalToCreate[]): Promise<void> {
    animals.forEach(async (element) => await this.addOne(element));
  }

  async getOne(animalId: string): Promise<Animal | undefined> {
    const animal = await this.db
      .select()
      .table('animals')
      .where({ id: animalId })
      .whereNull('deletedAt');
    return animal[0];
  }

  async deleteOne(animalId: string): Promise<void> {
    await this.db<Animal>('animals')
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
    await this.db<Animal>('animals')
      .where({ id: animalId })
      .whereNull('deletedAt')
      .update({ ...data, updatedAt: new Date() });
    // const animal = await this.getOne(animalId);w3
    // console.log(animal);
  }
}
