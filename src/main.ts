import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';
import * as cookieParser from 'cookie-parser';
function configureSwagger(app): void {
  const config = new DocumentBuilder()
    .setTitle('auth-service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/auth/api/docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(cookieParser());
  configureSwagger(app);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get('RABBITMQ_URL')],
      queue: `${configService.get('RABBITMQ_AUTH_QUEUE')}`,
      prefetchCount: 1,
    },
  });
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
  console.log('🚀 Auth Service running on port: ' + configService.get('PORT'));
}
bootstrap();
