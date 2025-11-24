import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsNumberString } from 'class-validator';

export class GroupByCategoryQueryDto {
  @ApiProperty({
    description: 'Grouping mode: count returns category counts, list returns menu items grouped by category',
    example: 'count',
    enum: ['count', 'list'],
  })
  @IsIn(['count', 'list'])
  mode: string;

  @ApiPropertyOptional({
    description: 'Number of items per category (only for list mode)',
    example: '5',
    default: '5',
  })
  @IsOptional()
  @IsNumberString()
  per_category?: string;
}
