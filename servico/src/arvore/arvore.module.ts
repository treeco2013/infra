import { Module, forwardRef } from '@nestjs/common';
import { ArvoreController } from './arvore.controller';
import { ArvoreService } from './arvore.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuemMarcouModule } from 'src/quem-marcou/quem-marcou.module';
import { ImagemModule } from 'src/imagem/imagem.module';
import Arvore from './arvore.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Arvore]),
    forwardRef(() => QuemMarcouModule),
    forwardRef(() => ImagemModule),
  ],
  controllers: [ArvoreController],
  providers: [ArvoreService],
  exports: [ArvoreService],
})
export class ArvoreModule {}
