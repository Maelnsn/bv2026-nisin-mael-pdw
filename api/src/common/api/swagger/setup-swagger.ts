import { EnvService } from '@common/config/env.service';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication): void => {
  const envService = app.get(EnvService);
  if (!envService.swaggerEnabled) {
    return;
  }
  const config = new DocumentBuilder()
    .setTitle(envService.swaggerTitle)
    .setDescription(envService.swaggerDescription)
    .setVersion(envService.swaggerVersion)
    .addCookieAuth(
      envService.isProduction ? '__Host-hoos-access' : 'hoos-access',
      { type: 'apiKey', in: 'cookie', description: '…' },
      'access-cookie',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(envService.swaggerPath, app, document, {
    jsonDocumentUrl: `${envService.swaggerPath}/openapi.json`,
  });
};
