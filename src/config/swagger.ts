import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Adhan API')
    .setDescription('Prayer times, users, locations, preferences')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  let customCss = '';
  const distCssPath = path.resolve(__dirname, 'swagger-custom.css');
  const srcCssPath = path.resolve(
    __dirname.replace('dist', 'src'),
    'swagger-custom.css',
  );
  if (fs.existsSync(distCssPath)) {
    customCss = fs.readFileSync(distCssPath, 'utf8');
  } else if (fs.existsSync(srcCssPath)) {
    customCss = fs.readFileSync(srcCssPath, 'utf8');
  } else {
    customCss = '';
    // Optionally log a warning here
  }
  SwaggerModule.setup('docs', app, document, {
    customCss,
    customSiteTitle: 'Adhan API Docs',
  });
}
