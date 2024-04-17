import { Controller, Delete, Get, Param, Patch, Query } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalToCreate } from '../../db/types';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}
  @Get()
  getAnimals() {
    return this.animalsService.getAllAnimals();
  }
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.animalsService.getAnimal(id);
  }
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.animalsService.deleteAnimal(id);
  }
  @Patch(':id')
  update(
    @Param(':id') id: string,
    @Query('data') data: Partial<AnimalToCreate>,
  ) {
    return this.animalsService.updateAnimal(id, data);
  }
}
