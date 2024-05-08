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
  Query,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalType } from '../../db/types';
import { ZodValidationPipe } from './schemas/ZodValidationPipe';
import {
  CreateAnimalDto,
  CreateAnimalsDto,
  PaginationDto,
  UpdateAnimalDto,
  createAnimalSchema,
  createAnimalsSchema,
  paginationSchema,
  updateAnimalSchema,
} from './schemas/schemas';
import { pagination } from 'src/middleware/pagination.middleware';
import { Request, Response } from 'express';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Get()
  @HttpCode(200)
  async getAll(
    @Query(new ZodValidationPipe(paginationSchema)) query: PaginationDto,
  ) {
    const animals = await this.animalsService.getAll();
    // console.log(animals);
    // pagination(animals)(req, res, () => {
    //   const result = req.body;
    //   res.json(result);
    // });
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
  @HttpCode(200)
  async getOne(@Param('id') id: string) {
    const animal = await this.animalsService.getOne(id);
    return animal;
  }

  @Delete(':id')
  @HttpCode(204)
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
