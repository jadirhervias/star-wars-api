import { NotFoundException } from '@nestjs/common';

export class FilmNotFound extends NotFoundException {
  constructor() {
    super('Film not found.');
  }
}
