import Model from '../Shared/model';

export default class Film extends Model {
  readonly id: string;
  readonly title: string;
  readonly opening_crawl: string;
  readonly director: string;
  readonly producer: string;
  readonly release_date: string;

  constructor(
    id: string,
    title: string,
    opening_crawl: string,
    director: string,
    producer: string,
    release_date: string,
  ) {
    super();
    this.id = id;
    this.title = title;
    this.opening_crawl = opening_crawl;
    this.director = director;
    this.producer = producer;
    this.release_date = release_date;
  }

  static create(
    id: string,
    title: string,
    opening_crawl: string,
    director: string,
    producer: string,
    release_date: string,
  ): Film {
    return new Film(id, title, opening_crawl, director, producer, release_date);
  }

  toPrimitives() {
    return {
      id: this.id,
      title: this.title,
      opening_crawl: this.opening_crawl,
      director: this.director,
      producer: this.producer,
      release_date: this.release_date,
    };
  }
}
