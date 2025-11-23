export class CreateMenuDto {
  name: string;
  category: string;
  calories: number;
  price: number;
  ingredients: string[];
  description?: string;
}
