import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './Shared/filters/http-exception.filter.ts';
import { ValidationPipe } from '@nestjs/common';
import { CharactersModule } from './Character/characters.module';
import { FilmsModule } from './Film/films.module';
import { PlanetsModule } from './Planet/planets.module';

let server: Handler;

function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Star Wars API')
    .setDescription('REST API using Node.js, Serverless and Nest.js')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [CharactersModule, FilmsModule, PlanetsModule],
  });

  SwaggerModule.setup('docs', app, document);
}

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app);

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  if (event.path === '/api') {
    event.path = '/api/';
  }
  event.path = event.path.includes('swagger-ui')
    ? `/api${event.path}`
    : event.path;
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
