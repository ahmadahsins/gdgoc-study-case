import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class MenuQueryDto {
  @ApiPropertyOptional({
    description: 'Search query for menu name',
    example: 'ayam',
  })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({
    description: 'Filter by category',
    example: 'food',
    enum: ['food', 'drinks'],
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    description: 'Minimum price filter',
    example: '15000',
  })
  @IsOptional()
  @IsNumberString()
  min_price?: string;

  @ApiPropertyOptional({
    description: 'Maximum price filter',
    example: '30000',
  })
  @IsOptional()
  @IsNumberString()
  max_price?: string;

  @ApiPropertyOptional({
    description: 'Maximum calories filter',
    example: '600',
  })
  @IsOptional()
  @IsNumberString()
  max_cal?: string;

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: '1',
    default: '1',
  })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: '10',
    default: '10',
  })
  @IsOptional()
  @IsNumberString()
  per_page?: string;

  @ApiPropertyOptional({
    description: 'Sort field and order (field:order)',
    example: 'price:asc',
    enum: ['price:asc', 'price:desc', 'calories:asc', 'calories:desc', 'name:asc', 'name:desc'],
  })
  @IsOptional()
  @IsString()
  sort?: string;
}