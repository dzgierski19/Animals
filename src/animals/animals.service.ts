import { Injectable, NotFoundException } from '@nestjs/common';
import { Animal, AnimalToCreate } from './../../db/types';
import { DatabaseService } from './../database/database.service';

@Injectable()
export class AnimalsService {
  constructor(private readonly databaseHandler: DatabaseService) {}

  async getAll(): Promise<Animal[]> {
    return this.databaseHandler.getAll();
  }
  async addOne(animal: AnimalToCreate): Promise<void> {
    await this.databaseHandler.addOne(animal);
  }

  async addMoreThanOne(animals: AnimalToCreate[]): Promise<void> {
    await this.databaseHandler.addMoreThanOne(animals);
  }
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
