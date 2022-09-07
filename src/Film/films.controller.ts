import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FilmsService } from './films.service';
import Film from './Film';
import { FilmNotFound } from './exceptions/not-found.exception';

@ApiTags('films')
@ApiInternalServerErrorResponse({ description: 'Internal server error.' })
@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) { }

  @Get()
  @ApiOperation({ summary: 'Get all films' })
  @ApiOkResponse({
    schema: {
      example: {
        data: [
          {
            titulo: 'Attack of the Clones',
            texto_de_apertura: `There is unrest in the Galactic\r\nSenate. Several thousand solar\r\n
            systems have declared their\r\nintentions to leave the Republic.\r\n\r\n
            This separatist movement,\r\nunder the leadership of the\r\nmysterious Count Dooku, has\r\n
            made it difficult for the limited\r\nnumber of Jedi Knights to maintain \r\n
            peace and order in the galaxy.\r\n\r\nSenator Amidala, the former\r\n
            Queen of Naboo, is returning\r\nto the Galactic Senate to vote\r\n
            on the critical issue of creating\r\nan ARMY OF THE REPUBLIC\r\nto assist the overwhelmed\r\nJedi....`,
            productor: 'Rick McCallum',
            fecha_de_estreno: '2002-05-16',
          },
          {
            titulo: 'A New Hope',
            texto_de_apertura: `It is a period of civil war.\r\nRebel spaceships, striking\r\n
            from a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\n
            During the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\n
            ultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\n
            to destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents,
            Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans
            that can save her\r\npeople and restore\r\nfreedom to the galaxy....`,
            productor: 'Gary Kurtz, Rick McCallum',
            fecha_de_estreno: '1977-05-25',
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
  async findAll(@Query('page', ParseIntPipe) page: number = 1): Promise<Film[]> {
    return await this.filmsService.findAll(page);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an specific Star Wars film by ID' })
  @ApiOkResponse({
    description: 'Film found successfully.',
    schema: {
      example: {
        data: {
          titulo: 'A New Hope',
          texto_de_apertura: `It is a period of civil war.\r\nRebel spaceships, striking\r\n
          from a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\n
          During the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\n
          ultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\n
          to destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents,
          Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans
          that can save her\r\npeople and restore\r\nfreedom to the galaxy....`,
          productor: 'Gary Kurtz, Rick McCallum',
          fecha_de_estreno: '1977-05-25',
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
  @ApiNotFoundResponse({ description: 'Film not found.' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Film> {
    const film = await this.filmsService.findOne(id);
    if (!film) {
      throw new FilmNotFound();
    }
    return film;
  }
}
