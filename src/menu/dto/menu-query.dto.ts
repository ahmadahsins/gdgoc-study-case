import { IsNumberString, IsOptional, IsString } from "class-validator";

export class MenuQueryDto {
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumberString()
  min_price?: string;

  @IsOptional()
  @IsNumberString()
  max_price?: string;

  @IsOptional()
  @IsNumberString()
  max_cal?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  per_page?: string;

  @IsOptional()
  @IsString()
  sort?: string;
}