import { Inject, Injectable } from '@nestjs/common';
import {
  PlanetsRepository,
  PlanetsRepositoryToken,
} from './planets.repository';
import Planet from './Planet';
import { Nullable } from '../Shared/types/nullable.type';

@Injectable()
export class PlanetsService {
  constructor(
    @Inject(PlanetsRepositoryToken)
    private _repository: PlanetsRepository,
  ) {}

  async findAll(page = 1): Promise<Planet[]> {
    return this._repository.findAll(page);
  }

  async findOne(id: number): Promise<Nullable<Planet>> {
    return await this._repository.findOneById(id);
  }
}
