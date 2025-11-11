import * as path from 'path';

import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { type NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';

import { AppModule } from './app.module';
import { UPLOAD_CONFIG } from './upload/constants/upload.constants';

const DOCUMENTATION = 'docs';

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const logger = new Logger('Bootstrap');

  await app.register(multipart, {
    limits: {
      fileSize: UPLOAD_CONFIG.MAX_FILE_SIZE,
    },
  });

  await app.register(fastifyStatic, {
    root: path.join(process.cwd(), 'uploads'),
    prefix: '/api/uploads/',
  });

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
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management endpoints')
    .addBearerAuth()
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

  logger.log(`Server running on: ${hostUrl}/api`);
  logger.log(`Swagger docs: ${hostUrl}/${DOCUMENTATION}`);
  logger.log(`Swagger JSON: ${hostUrl}/${DOCUMENTATION}-json`);
};

bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error('Application failed to start:', error);
  process.exit(1);
});
