import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("Bootstrap");

  // Enable CORS
  app.enableCors();

  // Swagger
  const config = new DocumentBuilder()
    .setTitle("N-Crawl API")
    .setDescription("The API description")
    .setVersion("1.0")
    .addBearerAuth({ type: "http", scheme: "bearer", bearerFormat: "JWT" })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // Start the app
  await app.listen(process.env.PORT ?? 3000, () => {
    logger.log(`Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
    logger.log(`Swagger is running on: http://localhost:${process.env.PORT ?? 3000}/docs`);
  });

  // Hot Module Replacement
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
