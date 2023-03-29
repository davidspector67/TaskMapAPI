import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  
  const config = new DocumentBuilder()
    .setTitle('TaskMap')
    .setDescription('Task Organization Made Simple')
    .setVersion('1.0')
    .addBearerAuth({
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT",
			name: "JWT",
			description: "Enter JWT token",
			in: "header",
		})
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(parseInt(process.env.BACKEND_PORT));
}
bootstrap();
