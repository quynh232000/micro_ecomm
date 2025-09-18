import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // setup swagger
  const config = new DocumentBuilder().setTitle('Auth Service API')
    .setDescription('API documentation for Auth Service')
    .setVersion('1.0')
    .addBearerAuth() // 👈 thêm JWT bearer token vào Swagger UI
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);



  const port = process.env.PORT ?? 5000;
  await app.listen(port, '0.0.0.0');
  console.log('App start s at: http://localhost:' + port);
}
bootstrap();
