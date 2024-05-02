import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Animal, AnimalToCreate } from 'db/types';
import { IDatabaseService } from './../database/database.service';

@Injectable()
export class mockDatabaseService implements IDatabaseService {
  fakeDb: Animal[] = [];
  async getAll() {
    return this.fakeDb.filter((element) => !element.deletedAt);
  }
  async addOne(animal: AnimalToCreate) {
    const createdAnimal: Animal = {
      id: randomUUID(),
      name: animal.name,
      type: animal.type,
      createdAt: new Date(),
      deletedAt: null,
    };
    this.fakeDb.push(createdAnimal);
  }
  async addMoreThanOne(animals: AnimalToCreate[]) {
    animals.forEach((animal) => {
      this.addOne(animal);
    });
    console.log(animals);
  }
  async getOne(animalId: string) {
    return this.fakeDb.find((animal) => {
      if (!animal.deletedAt && animal.id === animalId) {
        return animal;
      }
    });
  }
  async deleteOne(animalId: string) {
    this.fakeDb.find((animal) => {
      if (!animal.deletedAt && animal.id === animalId) {
        animal.deletedAt = new Date();
        console.log(animal);
      }
    });
  }
  async updateInfo(animalId: string, data: Partial<AnimalToCreate>) {
    this.fakeDb.find((animal) => {
      if (animal.id === animalId) {
        Object.keys(data).forEach(
          (element) => (animal[element] = data[element]),
        );
      }
      console.log(animal);
    });
  }
}