import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiParam,
  ApiTags,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { PlanetsService } from './planets.service';
import Planet from './Planet';
import { PlanetNotFound } from './exceptions/not-found.exception';

@ApiTags('planets')
@ApiInternalServerErrorResponse({ description: 'Internal server error.' })
@Controller('planets')
export class PlanetsController {
  constructor(private planetsService: PlanetsService) { }

  @Get()
  @ApiOperation({ summary: 'Get all planets' })
  @ApiOkResponse({
    schema: {
      example: {
        data: [
          {
            nombre: 'Mustafar',
            clima: 'hot',
            diametro: '4200',
            poblacion: '20000',
            terreno: 'volcanoes, lava rivers, mountains, caves',
          },
          {
            nombre: 'Kashyyyk',
            clima: 'tropical',
            diametro: '12765',
            poblacion: '45000000',
            terreno: 'jungle, forests, lakes, rivers',
          },
        ],
      },
    },
  })
  @ApiQuery({
    name: 'lang',
    type: 'string',
    enum: ['en', 'es'],
    required: false,
    schema: {
      default: 'es'
    }
  })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  async findAll(@Query('page', ParseIntPipe) page: number = 1): Promise<Planet[]> {
    return await this.planetsService.findAll(page);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an specific Star Wars planet by ID' })
  @ApiOkResponse({
    description: 'Planet found successfully.',
    schema: {
      example: {
        data: {
          nombre: 'Cato Neimoidia',
          clima: 'temperate, moist',
          diametro: '0',
          poblacion: '10000000',
          terreno: 'mountains, fields, forests, rock arches',
        },
      },
    },
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiQuery({
    name: 'lang',
    type: 'string',
    enum: ['en', 'es'],
    required: false,
    schema: {
      default: 'es'
    }
  })
  @ApiNotFoundResponse({ description: 'Planet not found.' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Planet> {
    const planet = await this.planetsService.findOne(id);
    if (!planet) {
      throw new PlanetNotFound();
    }
    return planet;
  }
}
