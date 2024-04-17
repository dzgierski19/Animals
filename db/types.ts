const ANIMALTYPE = {
  MAMMAL: 'mammal',
  BIRD: 'bird',
  FISH: 'fish',
  REPTILE: 'reptile',
  INSECT: 'insect',
} as const;

export type AnimalType = (typeof ANIMALTYPE)[keyof typeof ANIMALTYPE];

export interface Animal {
  id: string;
  name: string;
  type: AnimalType;
  createdAt: Date;
  deletedAt: Date | null;
}

export type AnimalToCreate = Omit<Animal, 'id' | 'createdAt' | 'deletedAt'>;
