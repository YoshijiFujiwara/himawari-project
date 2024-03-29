import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  if (process.env.ENABLED_CORS) {
    app.enableCors();
  }

  const options = new DocumentBuilder()
    .setTitle('ひまわりプロジェクト')
    .setDescription('APIドキュメント')
    .setVersion('1.0')
    .addBearerAuth()
    .setBasePath('/')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
