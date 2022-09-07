import { Nullable } from 'src/Shared/types/nullable.type';
import Character from './Character';

export const CharactersRepositoryToken = Symbol('CharactersRepository');

export interface CharactersRepository {
  findAll(): Promise<Character[]>;
  store(character: Character): Promise<void>;
  findOneById(id: string): Promise<Nullable<Character>>;
}
