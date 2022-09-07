import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import Character from './Character';
import { Nullable } from '../Shared/types/nullable.type';

@ApiTags('characters')
@ApiInternalServerErrorResponse({ description: 'Internal server error.' })
@Controller('characters')
export class CharactersController {
  constructor(private charactersService: CharactersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all custom characters' })
  @ApiOkResponse({
    schema: {
      example: {
        data: [
          {
            nombre: 'John Doe',
            edad: 26,
          },
          {
            nombre: 'Mark Ruffalo',
            edad: 30,
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
      default: 'es',
    },
  })
  async findAll(): Promise<Character[]> {
    return await this.charactersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an specific custom character by ID' })
  @ApiOkResponse({
    description: 'Character found successfully.',
    schema: {
      example: {
        data: {
          nombre: 'John Doe',
          edad: 26,
        },
      },
    },
  })
  @ApiParam({ name: 'id', type: 'uuid' })
  @ApiQuery({
    name: 'lang',
    type: 'string',
    enum: ['en', 'es'],
    required: false,
    schema: {
      default: 'es',
    },
  })
  @ApiNotFoundResponse({ description: 'Character not found.' })
  async findOne(@Param('id') id: string): Promise<Nullable<Character>> {
    return await this.charactersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create custom character' })
  @ApiCreatedResponse({
    description: 'Character created successfully.',
    schema: {
      example: {
        data: {
          nombre: 'John Doe',
          edad: 26,
        },
      },
    },
  })
  @ApiBody({
    description: 'Create character payload',
    type: CreateCharacterDto,
  })
  async store(@Body() characterDto: CreateCharacterDto) {
    return await this.charactersService.store(characterDto);
  }
}
