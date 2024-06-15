import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Animal, AnimalToCreate } from './../../db/types';
import {
  AnimalsDatabaseAdapter,
  IDatabaseAdapter,
} from './../animals/animals.db.adapter';

export interface IAnimalsService {
  getAll(): Promise<Animal[]>;
  addOne(animal: AnimalToCreate): Promise<void>;
  // addMoreThanOne(animals: AnimalToCreate[]): Promise<void>;
  getOne(animalId: string): Promise<Animal>;
  deleteOne(animalId: string): Promise<void>;
  updateOne(animalId: string, data: Partial<AnimalToCreate>): Promise<void>;
}

@Injectable()
export class AnimalsService implements IAnimalsService {
  constructor(
    @Inject('IDatabaseAdapter')
    private readonly databaseHandler: IDatabaseAdapter,
  ) {}

  async getAll(): Promise<Animal[]> {
    return this.databaseHandler.getAll();
  }
  async addOne(animal: AnimalToCreate): Promise<void> {
    await this.databaseHandler.addOne(animal);
  }

  // async addMoreThanOne(animals: AnimalToCreate[]): Promise<void> {
  //   await this.databaseHandler.addMoreThanOne(animals);
  // }
  async getOne(animalId: string): Promise<Animal> {
    const animal = await this.databaseHandler.getOne(animalId);
    if (animal) {
      return animal;
    }
    throw new NotFoundException(`${animalId} is not available`);
  }

  async deleteOne(animalId: string): Promise<void> {
    await this.getOne(animalId);
    await this.databaseHandler.deleteOne(animalId);
  }

  async updateOne(animalId: string, data: Partial<AnimalToCreate>) {
    await this.getOne(animalId);
    try {
      await this.databaseHandler.updateInfo(animalId, data);
    } catch (error) {
      throw new NotFoundException(
        `Please change your data or properties to update`,
      );
    }
  }
}
