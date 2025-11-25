import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

// Cache the Express app instance
let cachedApp: any;

async function bootstrap() {
  const expressApp = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  // Enable CORS for Vercel
  app.enableCors();

  // Enable validation pipes
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Menu Catalog API')
    .setDescription('API for managing restaurant menu items with AI-powered features including auto-generated descriptions and personalized recommendations')
    .setVersion('1.0')
    .addTag('menu', 'Menu CRUD operations')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  // Use CDN for Swagger assets (better for Vercel serverless)
  SwaggerModule.setup('api', app, document, {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-standalone-preset.js',
    ],
  });

  await app.init();
  
  return expressApp;
}

// For Vercel serverless
export default async (req: any, res: any) => {
  if (!cachedApp) {
    cachedApp = await bootstrap();
  }
  return cachedApp(req, res);
};

// For traditional server (local development)
if (require.main === module) {
  (async () => {
    const app = await NestFactory.create(AppModule);
    
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
    }));

    const config = new DocumentBuilder()
      .setTitle('Menu Catalog API')
      .setDescription('API for managing restaurant menu items with AI-powered features')
      .setVersion('1.0')
      .addTag('menu', 'Menu CRUD operations')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
      customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css',
      customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-standalone-preset.js',
      ],
    });

    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
    console.log(`Swagger documentation available at: http://localhost:${port}/api`);
  })();
}


