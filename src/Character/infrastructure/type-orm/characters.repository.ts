import { TypeOrmRepository } from '../../../Infrastructure/persistence/type-orm/type-orm.repository';
import { CharactersRepository } from 'src/Character/characters.repository';
import { Nullable } from 'src/Shared/types/nullable.type';
import { Injectable } from '@nestjs/common';
import Character from '../../Character';

@Injectable()
export class CharactersTypeOrmRepository
  extends TypeOrmRepository<Character>
  implements CharactersRepository
{
  protected entityTarget(): string {
    return 'CharacterEntity';
  }

  public async findAll(): Promise<Character[]> {
    return await this.repository().find();
  }

  public async store(character: Character): Promise<void> {
    return await this.persist(character);
  }

  public async findOneById(id: string): Promise<Nullable<Character>> {
    return await this.repository().findOneBy({ id });
  }
}
