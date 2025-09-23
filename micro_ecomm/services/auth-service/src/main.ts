import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RequestMethod } from '@nestjs/common';
async function bootstrap() {
  // init app
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // set view
  app.setBaseViewsDir(join(__dirname, 'views')); // __dirname = /dist/src
  app.setViewEngine('ejs');

  // global prefix
  app.setGlobalPrefix('auth-service/v1', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  // setup swagger
  const config = new DocumentBuilder().setTitle('Auth Service API')
    .setDescription('API documentation for Auth Service')
    .setVersion('1.0')
    .addBearerAuth() // 👈 thêm JWT bearer token vào Swagger UI
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // set port
  const port = process.env.PORT ?? 5000;
  await app.listen(port, '0.0.0.0');
  console.log('App start s at: http://localhost:' + port);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
