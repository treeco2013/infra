import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagemService } from './imagem.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import Imagem from './imagem.entity';
import { EncriptacaoService } from 'src/utils/encriptacao.service';

@Controller('imagem')
export class ImagemController {
  constructor(
    private readonly imagemService: ImagemService,
    private readonly encriptacaoService: EncriptacaoService,
  ) {}

  @Post(':dados')
  @UseInterceptors(
    FileInterceptor('imagem', {
      storage: diskStorage({
        destination: '/imagens',
        filename: (_, file, cb) => {
          const nomeImagem = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          cb(null, `${nomeImagem}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async adicionar(
    @Param('dados') dados: any,
    @UploadedFile() imagem: Express.Multer.File,
  ) {
    const adicionado: Imagem = await this.imagemService.adicionar(
      Number(this.encriptacaoService.desencriptar(dados).idArvore),
      imagem,
    );

    return this.encriptacaoService.encriptar({ sucesso: adicionado != null });
  }

  @Delete(':dados')
  async remover(@Param('dados') dados: any) {
    const apagados: number = await this.imagemService.remover(
      Number(this.encriptacaoService.desencriptar(dados).id),
    );

    return this.encriptacaoService.encriptar({
      sucesso: apagados > 0,
      apagados: apagados,
    });
  }
}
