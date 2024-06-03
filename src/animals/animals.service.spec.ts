import { Test, TestingModule } from '@nestjs/testing';
import { AnimalsDatabaseAdapter, IDatabaseAdapter } from './animals.db.adapter';
import { ANIMALTYPE, AnimalToCreate } from './../../db/types';
import { AnimalsService, IAnimalsService } from './../animals/animals.service';
import { mockDatabaseService } from './../database-mock/database-mock.service';
import { NotFoundException } from '@nestjs/common';

describe('AnimalsService testing', () => {
  let mockService: IDatabaseAdapter;
  let mockRepo: IAnimalsService;
  let animal: AnimalToCreate;

  beforeEach(async () => {
    mockService = new mockDatabaseService();
    mockRepo = new AnimalsService(mockService);
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalsDatabaseAdapter],
    }).compile();
    mockService = module.get<AnimalsDatabaseAdapter>(AnimalsDatabaseAdapter);
    animal = {
      name: 'fakeAnimal',
      type: ANIMALTYPE.BIRD,
    };
  });

  it('should be defined', () => {
    expect(mockRepo).toBeDefined();
  });
  it('should add an animal to the database', async () => {
    await mockRepo.addOne(animal);
    const animals = await mockRepo.getAll();
    expect(animals[0].name).toBe('fakeAnimal');
  });
  it('should delete an animal from the database', async () => {
    await mockRepo.addOne(animal);
    const animals = await mockRepo.getAll();
    await mockRepo.deleteOne(animals[0].id);
    const updatedAnimals = await mockRepo.getAll();
    expect(updatedAnimals).toHaveLength(0);
  });
  it('should update an animal`s name', async () => {
    await mockRepo.addOne(animal);
    const animals = await mockRepo.getAll();
    await mockRepo.updateOne(animals[0].id, { name: 'changedName' });
    expect(animals[0].name).toBe('changedName');
  });
  describe('should throw an error when: ', () => {
    it('deleting an animal which is already deleted', async () => {
      await mockRepo.addOne(animal);
      const animals = await mockRepo.getAll();
      await mockRepo.deleteOne(animals[0].id);
      await expect(mockRepo.deleteOne(animals[0].id)).rejects.toThrow(
        NotFoundException,
      );
    });
    it('getting an animal info that does not exist from database', async () => {
      await mockRepo.addOne(animal);
      await expect(mockRepo.getOne('BAD ID')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
