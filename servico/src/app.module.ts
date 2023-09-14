import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import * as Joi from '@hapi/joi';
import { DatabaseModule } from './db.module';
import { ArvoreModule } from './arvore/arvore.module';
import { QuemMarcouModule } from './quem-marcou/quem-marcou.module';
import { ImagemModule } from './imagem/imagem.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        IMAGENS_HOST: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    ArvoreModule,
    QuemMarcouModule,
    ImagemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
