import { GoogleGenAI } from '@google/genai';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private readonly ai: GoogleGenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined in the environment variables');
    }
    
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateMenuDescription(name: string, category: string, ingredients: string[], calories?: number): Promise<string> {
    try {
      const prompt = `You are a professional food menu writer. Generate an appetizing, concise description (max 2-3 sentences) for a menu item with the following details:
      Name: ${name}
      Category: ${category}
      Ingredients: ${ingredients.join(', ')}
      ${calories ? `Calories: ${calories}` : ''}
      Write a description that highlights the key flavors, textures, and appeal of this dish. Be creative but professional.`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return response.text?.trim() as string;
    } catch (error) {
      this.logger.error('Failed to generate description', error);
      return `Delicious ${name} made with ${ingredients.slice(0, 3).join(', ')}${ingredients.length > 3 ? ', and more' : ''}.`;    }
  }
}
