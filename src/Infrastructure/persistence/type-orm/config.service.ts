import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(@Inject(ConfigService) private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get<any>('db.provider'),
      host: this.configService.get<string>('db.url'),
      port: this.configService.get<number>('db.port'),
      username: this.configService.get<string>('db.user'),
      password: this.configService.get<string>('db.password'),
      database: this.configService.get<string>('db.database'),
      entities: [`${__dirname}/entities/*.entity.ts`],
      synchronize: process.env.NODE_ENV === 'local',
      autoLoadEntities: process.env.NODE_ENV === 'local',
    };
  }
}
