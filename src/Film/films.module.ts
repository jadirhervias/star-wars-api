import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsRepositoryToken } from './films.repository';
import { FilmsSwapiRepository } from './infrastructure/swapi/films.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [
    FilmsService,
    FilmsSwapiRepository,
    {
      provide: FilmsRepositoryToken,
      useExisting: FilmsSwapiRepository,
    },
  ],
  controllers: [FilmsController],
})
export class FilmsModule {}
