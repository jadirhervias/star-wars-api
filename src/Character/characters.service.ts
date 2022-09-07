import { Inject, Injectable } from '@nestjs/common';
import Character from './Character';
import {
  CharactersRepository,
  CharactersRepositoryToken,
} from './characters.repository';
import { CharacterNotFound } from './exceptions/not-found.exception';
import { CreateCharacterDto } from './dto/create-character.dto';
import { Uuid } from '../Shared/helpers/uuid';

@Injectable()
export class CharactersService {
  constructor(
    @Inject(CharactersRepositoryToken)
    private _repository: CharactersRepository,
  ) {}

  async findAll(): Promise<Array<Character>> {
    return this._repository.findAll();
  }

  async findOne(id: string): Promise<Character> {
    const character = await this._repository.findOneById(id);

    if (!character) {
      throw new CharacterNotFound();
    }

    return character;
  }

  async store(data: CreateCharacterDto): Promise<Character> {
    const character = Character.create(
      Uuid.random().value,
      data.name,
      data.age,
    );

    await this._repository.store(character);

    return character;
  }
}
