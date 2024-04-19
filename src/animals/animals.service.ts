import { Injectable, NotFoundException } from '@nestjs/common';
import { Animal, AnimalToCreate } from './../../db/types';
import { DatabaseService } from './../database/database.service';

@Injectable()
export class AnimalsService {
  constructor(private readonly databaseHandler: DatabaseService) {}

  async getAllAnimals(): Promise<Animal[]> {
    return this.databaseHandler.getAll();
  }
  async addAnimal(animal: AnimalToCreate): Promise<void> {
    await this.databaseHandler.addOne(animal);
  }

  async addMoreThanOneAnimal(animals: AnimalToCreate[]): Promise<void> {
    await this.databaseHandler.addMoreThanOne(animals);
  }
  async getAnimal(animalId: string): Promise<Animal> {
    const animal = await this.databaseHandler.getOne(animalId);
    if (animal) {
      return animal;
    }
    throw new NotFoundException(`${animalId} is not available`);
  }

  async deleteAnimal(animalId: string): Promise<void> {
    await this.getAnimal(animalId);
    await this.databaseHandler.deleteOne(animalId);
  }

  async updateAnimal(animalId: string, data: Partial<AnimalToCreate>) {
    await this.getAnimal(animalId);
    try {
      await this.databaseHandler.updateInfo(animalId, data);
    } catch (error) {
      throw new NotFoundException(
        `Please change your data or properties to update`,
      );
    }
  }
}
