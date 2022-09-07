import { HttpService } from '@nestjs/axios';
import { HttpStatus, Inject } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import Model from '../../../Shared/model';
import { Nullable } from '../../../Shared/types/nullable.type';

export abstract class SwapiRepository<T extends Model> {
  constructor(@Inject(HttpService) private http: HttpService) { }

  protected abstract resourceName(): string;

  protected abstract responseSerializer(data: any): T;

  static baseUrl() {
    return 'https://swapi.py4e.com/api/';
  }

  private getResourceEndpoint(): string {
    return `${SwapiRepository.baseUrl()}/${this.resourceName()}`;
  }

  getAll(page: number): Observable<T[]> {
    return this.http.get(`${this.getResourceEndpoint()}/?page=${page}`).pipe(
      map(({ data, status }) => {
        if (status === HttpStatus.NOT_FOUND) {
          return [];
        }
        return Array.from(data.results).map((item) =>
          this.responseSerializer(item),
        );
      }),
    );
  }

  getOneById(resourceId: number): Observable<Nullable<T>> {
    return this.http.get(`${this.getResourceEndpoint()}/${resourceId}`).pipe(
      map(({ data, status }) => {
        if (status === HttpStatus.NOT_FOUND) {
          return null;
        }
        return this.responseSerializer(data);
      }),
    );
  }
}
