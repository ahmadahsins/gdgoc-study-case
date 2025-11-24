import { IsNumberString, IsOptional, IsString } from "class-validator";


export class RecomendationQueryDto {
  @IsOptional()
  @IsNumberString()
  max_calories?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  dietary_restrictions?: string; // comma-separated: "vegetarian,halal"

  @IsOptional()
  @IsString()
  mood?: string; // e.g., "healthy", "comfort food", "quick lunch"
}