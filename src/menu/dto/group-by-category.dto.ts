import { IsIn, IsOptional, IsNumberString } from 'class-validator';

export class GroupByCategoryQueryDto {
  @IsIn(['count', 'list'])
  mode: string;

  @IsOptional()
  @IsNumberString()
  per_category?: string;
}
