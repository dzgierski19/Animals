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
  Req,
  Res,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalType } from '../../db/types';
import { ZodValidationPipe } from './schemas/ZodValidationPipe';
import {
  CreateAnimalsDto,
  UpdateAnimalDto,
  createAnimalsSchema,
  stringToNumberSchema,
  stringToNumberType,
  updateAnimalSchema,
} from './schemas/schemas';
import { paginate } from './../middleware/pagination.middleware';
import { Request, Response } from 'express';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Get()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(stringToNumberSchema))
  async getAll(
    @Req() req: Request,
    @Res() res: Response,
    @Query('page') page?: stringToNumberType,
    @Query('limit') limit?: stringToNumberType,
  ) {
    // console.log(page);
    const animals = await this.animalsService.getAll();
    return paginate(animals, limit, page)(req, res, () => {
      const result = req.body;
      res.json(result);
    });
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAnimalsSchema))
  async addOneOrMore(@Body() animals: CreateAnimalsDto) {
    animals.forEach(
      async (element) => await this.animalsService.addOne(element),
    );
  }

  @Post('type/:type')
  @HttpCode(201)
  // @UsePipes(new ZodValidationPipe(createAnimalsSchema))
  async addByType(
    @Param('type') type: AnimalType,
    @Body(new ZodValidationPipe(createAnimalsSchema)) animals: CreateAnimalsDto,
  ) {
    console.log(type);
    const filteredType = animals.filter((element) => element.type === type);
    console.log(filteredType);
    if (!filteredType.length)
      throw new NotFoundException(`Animal with ${type} type not found`);
    filteredType.forEach(
      async (element) => await this.animalsService.addOne(element),
    );
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
