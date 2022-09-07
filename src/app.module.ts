import { Module, Scope } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { LanguajeInterceptor } from './Shared/interceptors/language.interceptor';
import { CharactersModule } from './Character/characters.module';
import { FilmsModule } from './Film/films.module';
import { PlanetsModule } from './Planet/planets.module';
import configuration from './Shared/config/configuration';
import { TypeOrmConfigService } from './Infrastructure/persistence/type-orm/config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'es',
      loaderOptions: {
        path: path.join(__dirname, '../resources/lang/'),
      },
      resolvers: [{ use: QueryResolver, options: ['lang'] }],
    }),
    CharactersModule,
    FilmsModule,
    PlanetsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LanguajeInterceptor,
      scope: Scope.REQUEST,
    },
  ],
})
export class AppModule { }
