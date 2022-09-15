import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  const config = new DocumentBuilder()
    .setTitle('Chat API  DOCUMENTATION')
    .setDescription('Gestion chat ')
    .setVersion('1.0')
    .addTag('chat')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('API', app, document);
  
  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.enableCors(
    { 
      origin: ['http://localhost:3000'],
    }
  );
  await app.listen(3333);
}
bootstrap();
