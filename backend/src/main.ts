import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { type NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

const DOCUMENTATION = 'docs';

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const logger = new Logger('Bootstrap');

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Product Catalog API')
    .setDescription('Swagger API Documentation')
    .setVersion('1.0.0')
    .addTag('products', 'Product management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(DOCUMENTATION, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = Number(process.env.PORT) || 4000;
  const hostUrl = process.env.HOST_URL || `http://localhost:${port}`;

  await app.listen(port, '0.0.0.0');
  logger.log(`🚀 Server running on: ${hostUrl}/api`);
  logger.log(`📚 Swagger docs: ${hostUrl}/${DOCUMENTATION}`);
  logger.log(`📄 Swagger JSON: ${hostUrl}/${DOCUMENTATION}-json`);
};

bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error('Application failed to start:', error);
  process.exit(1);
});
