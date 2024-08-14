import { NestFactory , } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.reduce((acc, err) => {
          acc[err.property] = Object.values(err.constraints).join(', ');
          return acc;
        }, {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          role: '',
          avtar: '',
        });
        return new BadRequestException(formattedErrors);
      },
    }),
    
  );
  
  await app.listen(3000);
}
bootstrap();
