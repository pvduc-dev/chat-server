import { NestApplication, NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create<NestApplication>(
    AppModule,
    {
      cors: true,
    },
  );
  const configService: ConfigService = app.get<ConfigService>(ConfigService);

  const swaggerDocumentOption = new DocumentBuilder()
    .setTitle('Chat server')
    .setVersion('0.0.1')
    .addBearerAuth()
    .addOAuth2()
    .build();
  const documentSwagger = SwaggerModule.createDocument(
    app,
    swaggerDocumentOption,
  );
  SwaggerModule.setup('api/docs', app, documentSwagger);

  await app.listen(configService.get<number>('PORT'));
}

bootstrap();
