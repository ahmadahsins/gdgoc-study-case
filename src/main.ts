import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
  SwaggerModule.setup('api', app, document);

  await app.init();
  
  return app;
}

// For Vercel serverless
export default async (req, res) => {
  const app = await bootstrap();
  const server = app.getHttpAdapter().getInstance();
  return server(req, res);
};

// For traditional server (local development)
if (require.main === module) {
  bootstrap().then(app => {
    const port = process.env.PORT ?? 3000;
    app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
    console.log(`Swagger documentation available at: http://localhost:${port}/api`);
  });
}

