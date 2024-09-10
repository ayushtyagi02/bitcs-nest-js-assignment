import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { Cat } from './cat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cat])],  // Register Cat entity
  providers: [CatsService],
  controllers: [CatsController],
  exports: [CatsService],  // Export CatsService if needed in other modules
})
export class CatsModule {}
