import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { GeminiModule } from 'src/gemini/gemini.module';

@Module({
  controllers: [MenuController],
  providers: [MenuService],
  imports: [DrizzleModule, GeminiModule],
})
export class MenuModule {}
