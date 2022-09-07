import { NotFoundException } from '@nestjs/common';

export class PlanetNotFound extends NotFoundException {
  constructor() {
    super('Planet not found.');
  }
}
