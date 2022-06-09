import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Nest-app')
    .setDescription('The portal API description')
    .addServer('api/v1')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  app.enableCors();
  app.setGlobalPrefix('api/v1');

  await app.listen(port);
}

bootstrap();
