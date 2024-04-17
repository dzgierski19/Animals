import { db } from './database';
import { Animal, AnimalToCreate } from './types';

export interface IDatabaseHandler {
  getAll(): Promise<Animal[]>;
  addOne(animal: AnimalToCreate): Promise<void>;
  getOne(animalId: string): Promise<Animal>;
  deleteOne(animalId: string): Promise<void>;
  updateInfo(animalId: string, data: Partial<AnimalToCreate>): Promise<void>;
}

export class DatabaseHandler implements IDatabaseHandler {
  async getAll(): Promise<Animal[]> {
    const animals = await db.select().table('animals').whereNull('deletedAt');
    return animals;
  }

  async addOne(animal: AnimalToCreate): Promise<void> {
    await db<Animal>('animals').insert(animal);
  }

  async getOne(animalId: string): Promise<Animal> {
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
      .update({ deletedAt: new Date() });
    const animal = await this.getOne(animalId);
    console.log(animal);
  }

  async updateInfo(
    animalId: string,
    data: Partial<AnimalToCreate>,
  ): Promise<void> {
    await db<Animal>('animals').where({ id: animalId }).update(data);
    const animal = await this.getOne(animalId);
    console.log(animal);
  }
}
