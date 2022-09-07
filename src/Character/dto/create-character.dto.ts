import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateCharacterDto {
  @ApiProperty({ type: 'string', required: true })
  @IsString()
  @MaxLength(150)
  @IsNotEmpty()
  name: string;
  @ApiProperty({ type: 'number', required: true })
  @IsNotEmpty()
  @IsNumber()
  age: number;
}
