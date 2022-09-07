import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterEntity } from '../Infrastructure/persistence/type-orm/entities/character.entity';
import { CharactersController } from './characters.controller';
import { CharactersRepositoryToken } from './characters.repository';
import { CharactersService } from './characters.service';
import { CharactersTypeOrmRepository } from './infrastructure/type-orm/characters.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CharacterEntity])],
  providers: [
    CharactersService,
    CharactersTypeOrmRepository,
    {
      provide: CharactersRepositoryToken,
      useExisting: CharactersTypeOrmRepository,
    },
  ],
  controllers: [CharactersController],
})
export class CharactersModule {}
