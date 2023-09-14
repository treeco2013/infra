/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import Imagem from './imagem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArvoreService } from 'src/arvore/arvore.service';
import Arvore from 'src/arvore/arvore.entity';
import * as fs from 'fs';

@Injectable()
export class ImagemService {
  constructor(
    @InjectRepository(Imagem)
    private imagemRepository: Repository<Imagem>,
    @Inject(forwardRef(() => ArvoreService))
    private readonly arvoreService: ArvoreService,
  ) {}

  async adicionar(
    idArvore: number,
    imagem: Express.Multer.File,
  ): Promise<Imagem> {
    console.log('imagem:', imagem);

    const entidade = this.imagemRepository.create({
      arvore: await this.arvoreService.encontrar(idArvore),
      arquivo: imagem.filename,
    });

    return await this.imagemRepository.save(entidade);
  }

  removerArquivo(imagem: Imagem): void {
    console.log('apagando arquivo de imagem:', imagem.arquivo);

    fs.unlinkSync('/imagens/' + imagem.arquivo);
  }

  async remover(id: number): Promise<number> {
    console.log('apagando imagem identificada pelo id:', id);

    const imagem: Imagem = await this.imagemRepository.findOneBy({ id: id });
    try {
      this.removerArquivo(imagem);
    } catch (error) {}

    const resultado = await this.imagemRepository.delete({ id: id });
    console.log('resultado:', resultado);

    return resultado.affected;
  }

  async removerPorArvore(idArvore: number): Promise<number> {
    console.log('apagando imagens da arvore identificada por:', idArvore);

    let removidos: number = 0;

    const arvore: Arvore = await this.arvoreService.encontrar(idArvore);
    if (arvore) {
      arvore.imagens.forEach(async (imagem) => {
        removidos += await this.remover(imagem.id);
      });
    }

    return removidos;
  }
}
