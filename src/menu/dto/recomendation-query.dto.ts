import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class RecomendationQueryDto {
  @ApiPropertyOptional({
    description: 'Maximum calories preference',
    example: '600',
  })
  @IsOptional()
  @IsNumberString()
  max_calories?: string;

  @ApiPropertyOptional({
    description: 'Preferred category',
    example: 'food',
    enum: ['food', 'drinks'],
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    description: 'Dietary restrictions (comma-separated)',
    example: 'halal',
  })
  @IsOptional()
  @IsString()
  dietary_restrictions?: string;

  @ApiPropertyOptional({
    description: 'Current mood or occasion',
    example: 'refreshing',
    enum: ['healthy', 'comfort food', 'quick lunch', 'refreshing', 'energizing', 'spicy'],
  })
  @IsOptional()
  @IsString()
  mood?: string;
}