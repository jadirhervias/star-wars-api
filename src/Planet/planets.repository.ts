import { Nullable } from 'src/Shared/types/nullable.type';
import Planet from './Planet';

export const PlanetsRepositoryToken = Symbol('PlanetsRepository');

export interface PlanetsRepository {
  findAll(page: number): Promise<Planet[]>;
  findOneById(id: number): Promise<Nullable<Planet>>;
}
