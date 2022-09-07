import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PlanetsSwapiRepository } from './infrastructure/swapi/planets.repository';
import { PlanetsController } from './planets.controller';
import { PlanetsRepositoryToken } from './planets.repository';
import { PlanetsService } from './planets.service';

@Module({
  imports: [HttpModule],
  providers: [
    PlanetsService,
    PlanetsSwapiRepository,
    {
      provide: PlanetsRepositoryToken,
      useExisting: PlanetsSwapiRepository,
    },
  ],
  controllers: [PlanetsController],
})
export class PlanetsModule {}
