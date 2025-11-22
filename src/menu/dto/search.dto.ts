import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class SearchMenuQueryDto {
  @IsString()
  q: string;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  per_page?: string;
}
