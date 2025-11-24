import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class SearchMenuQueryDto {
  @ApiProperty({
    description: 'Search query string',
    example: 'kopi',
  })
  @IsString()
  q: string;

  @ApiPropertyOptional({
    description: 'Page number',
    example: '1',
    default: '1',
  })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({
    description: 'Items per page',
    example: '10',
    default: '10',
  })
  @IsOptional()
  @IsNumberString()
  per_page?: string;
}
