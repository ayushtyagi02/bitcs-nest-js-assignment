import { Controller, Get, Param, Query, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto, CreateCatSchema } from './create-cat.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JoiValidationPipe } from '../pipes/joi-validation.pipe';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  search(@Query('age_gte') age_gte: number, @Query('age_lte') age_lte: number) {
    return this.catsService.search(age_gte, age_lte);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.catsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body(new JoiValidationPipe(CreateCatSchema)) createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateCatDto: Partial<CreateCatDto>) {
    return this.catsService.update(id, updateCatDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.catsService.remove(id);
  }
}
