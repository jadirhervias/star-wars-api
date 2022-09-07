import { firstValueFrom } from 'rxjs';
import { FilmsRepository } from '../../films.repository';
import Film from '../../Film';
import { SwapiRepository } from '../../../Infrastructure/third-party/swapi/swapi.repository';
import { FilmNotFound } from '../../exceptions/not-found.exception';

export class FilmsSwapiRepository
  extends SwapiRepository<Film>
  implements FilmsRepository
{
  protected resourceName(): string {
    return 'films';
  }

  protected responseSerializer(data: any): Film {
    return Film.create(
      data.id,
      data.title,
      data.opening_crawl,
      data.director,
      data.producer,
      data.release_date,
    );
  }

  async findAll(page = 1): Promise<Film[]> {
    return await firstValueFrom(this.getAll(page));
  }

  async findOneById(id: number): Promise<Film> {
    const film = await firstValueFrom(this.getOneById(id));
    if (!film) {
      throw new FilmNotFound();
    }
    return film;
  }
}
