import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './db.module';
import { ArvoreModule } from './arvore/arvore.module';
import { QuemMarcouModule } from './quem-marcou/quem-marcou.module';
import { ImagemModule } from './imagem/imagem.module';
import { EncriptacaoModule } from './utils/encriptacao.module';
import configuracao from './configuracao';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuracao],
      isGlobal: true,
    }),
    EncriptacaoModule,
    DatabaseModule,
    ArvoreModule,
    QuemMarcouModule,
    ImagemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
