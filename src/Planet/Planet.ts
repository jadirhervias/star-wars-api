import Model from '../Shared/model';

export default class Planet extends Model {
  readonly id: string;
  readonly name: string;
  readonly climate: string;
  readonly diameter: string;
  readonly population: number;
  readonly terrain: string;

  constructor(
    id: string,
    name: string,
    climate: string,
    diameter: string,
    population: number,
    terrain: string,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.climate = climate;
    this.diameter = diameter;
    this.population = population;
    this.terrain = terrain;
  }

  static create(
    id: string,
    name: string,
    climate: string,
    diameter: string,
    population: number,
    terrain: string,
  ): Planet {
    return new Planet(id, name, climate, diameter, population, terrain);
  }

  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      climate: this.climate,
      diameter: this.diameter,
      population: this.population,
      terrain: this.terrain,
    };
  }
}
