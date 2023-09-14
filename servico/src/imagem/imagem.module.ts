import { Module, forwardRef } from '@nestjs/common';
import { ImagemController } from './imagem.controller';
import { ImagemService } from './imagem.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import Imagem from './imagem.entity';
import { ArvoreModule } from 'src/arvore/arvore.module';
import { EncriptacaoModule } from 'src/utils/encriptacao.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Imagem]),
    forwardRef(() => ArvoreModule),
    EncriptacaoModule,
  ],
  controllers: [ImagemController],
  providers: [ImagemService],
  exports: [ImagemService],
})
export class ImagemModule {}
