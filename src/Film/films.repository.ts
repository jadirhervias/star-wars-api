import { Nullable } from 'src/Shared/types/nullable.type';
import Film from './Film';

export const FilmsRepositoryToken = Symbol('FilmsRepository');

export interface FilmsRepository {
  findAll(page: number): Promise<Film[]>;
  findOneById(id: number): Promise<Nullable<Film>>;
}
