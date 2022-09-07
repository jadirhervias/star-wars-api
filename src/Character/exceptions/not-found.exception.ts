import { NotFoundException } from '@nestjs/common';

export class CharacterNotFound extends NotFoundException {
  constructor() {
    super('Character not found.');
  }
}
