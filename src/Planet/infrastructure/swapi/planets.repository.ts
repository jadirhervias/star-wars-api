import { firstValueFrom } from 'rxjs';
import { PlanetsRepository } from '../../planets.repository';
import Planet from '../../Planet';
import { SwapiRepository } from '../../../Infrastructure/third-party/swapi/swapi.repository';
import { PlanetNotFound } from '../../exceptions/not-found.exception';

export class PlanetsSwapiRepository
  extends SwapiRepository<Planet>
  implements PlanetsRepository {
  protected resourceName(): string {
    return 'planets';
  }

  protected responseSerializer(data: any): Planet {
    return Planet.create(
      data.id,
      data.name,
      data.climate,
      data.diameter,
      data.population,
      data.terrain,
    );
  }

  async findAll(page = 1): Promise<Planet[]> {
    return await firstValueFrom(this.getAll(page));
  }

  async findOneById(id: number): Promise<Planet> {
    const planet = await firstValueFrom(this.getOneById(Number(id)))
    if (!planet) {
      throw new PlanetNotFound();
    }
    return planet;
  }
}
