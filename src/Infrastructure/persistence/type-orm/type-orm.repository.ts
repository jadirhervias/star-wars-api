import { InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import Model from '../../../Shared/model';

export abstract class TypeOrmRepository<T extends Model> {
  constructor(
    @InjectDataSource()
    private _dataSource: DataSource,
  ) { }

  protected abstract entityTarget(): string;

  protected dataSource(): DataSource {
    return this._dataSource;
  }

  protected repository(): Repository<T> {
    return this._dataSource.getRepository<T>(this.entityTarget());
  }

  protected async persist(model: T): Promise<void> {
    const data = model.toPrimitives();

    await this.repository().save<T>(data);
  }

  public async findByCondition(filterCondition: any): Promise<T> {
    return await this.repository().findOne({ where: filterCondition });
  }

  public async findAll(): Promise<T[]> {
    return await this.repository().createQueryBuilder()
      .orderBy({ updated_at: 'DESC' })
      .getMany();
  }

  public async remove(id: string): Promise<void> {
    await this.repository().delete(id);
  }
}
