import { Inject, Injectable } from '@nestjs/common';
import { FilmsRepository, FilmsRepositoryToken } from './films.repository';
import Film from './Film';
import { Nullable } from '../Shared/types/nullable.type';

@Injectable()
export class FilmsService {
  constructor(
    @Inject(FilmsRepositoryToken)
    private _repository: FilmsRepository,
  ) { }

  async findAll(page: number = 1): Promise<Film[]> {
    return this._repository.findAll(page);
  }

  async findOne(id: number): Promise<Nullable<Film>> {
    return await this._repository.findOneById(id);
  }
}
