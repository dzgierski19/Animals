import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalType } from '../../db/types';
import { ZodValidationPipe } from './schemas/ZodValidationPipe';
import {
  CreateAnimalDto,
  CreateAnimalsDto,
  UpdateAnimalDto,
  createAnimalSchema,
  createAnimalsSchema,
  updateAnimalSchema,
} from './schemas/schemas';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Get()
  async getAll() {
    const animals = await this.animalsService.getAll();
    return animals;
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAnimalSchema))
  async addOne(@Body() animal: CreateAnimalDto) {
    console.log(animal);
    await this.animalsService.addOne(animal);
  }

  @Post('add-few')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAnimalsSchema))
  async addMoreThanOne(@Body() animals: CreateAnimalsDto) {
    console.log(animals);
    await this.animalsService.addMoreThanOne(animals);
  }

  @Post(':type')
  @HttpCode(201)
  async addByType(
    @Param('type') type: AnimalType,
    @Body() animals: CreateAnimalDto[],
  ) {
    const filteredType = animals.filter((element) => element.type === type);
    console.log(filteredType);
    if (!filteredType)
      throw new NotFoundException(`User with ${type} not found`);
    await this.animalsService.addMoreThanOne(filteredType);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const animal = await this.animalsService.getOne(id);
    return animal;
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteOne(@Param('id') id: string) {
    await this.animalsService.deleteOne(id);
    return { id };
  }

  @Patch(':id')
  @HttpCode(204)
  async updateOne(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateAnimalSchema)) data: UpdateAnimalDto,
  ) {
    await this.animalsService.updateOne(id, data);
    const animal = await this.animalsService.getOne(id);
    return animal;
  }
}
