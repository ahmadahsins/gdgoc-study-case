import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { MenuModule } from './menu/menu.module';
import { ConfigModule } from '@nestjs/config';
import { GeminiModule } from './gemini/gemini.module';

@Module({
  imports: [DrizzleModule, MenuModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }), GeminiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
