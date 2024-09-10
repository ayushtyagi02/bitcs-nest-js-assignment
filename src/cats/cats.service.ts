import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Cat } from './cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  // Find all cats
  findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  // Find one cat by ID
  async findOne(id: number): Promise<Cat> {
    const cat = await this.catsRepository.findOne({ where: { id } });
    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return cat;
  }

  // Search for cats within age range
  async search(age_gte: number, age_lte: number): Promise<Cat[]> {
    return this.catsRepository.find({
      where: { age: Between(age_gte, age_lte) },
    });
  }

  // Create a new cat
  async create(cat: Partial<Cat>): Promise<Cat> {
    const newCat = this.catsRepository.create(cat);
    return this.catsRepository.save(newCat);
  }

  // Update an existing cat
  async update(id: number, updatedCat: Partial<Cat>): Promise<Cat> {
    const cat = await this.findOne(id);
    Object.assign(cat, updatedCat);
    return this.catsRepository.save(cat);
  }

  // Delete a cat by ID
  async remove(id: number): Promise<void> {
    const result = await this.catsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
  }
}
