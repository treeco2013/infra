/* eslint-disable @typescript-eslint/no-unused-vars */
import { InjectRepository } from '@nestjs/typeorm';
import Arvore from './arvore.entity';
import { Repository } from 'typeorm';
import { QuemMarcouService } from 'src/quem-marcou/quem-marcou.service';
import { Inject, forwardRef } from '@nestjs/common';
import { ImagemService } from 'src/imagem/imagem.service';

export class ArvoreService {
  constructor(
    @InjectRepository(Arvore)
    private arvoreRepository: Repository<Arvore>,
    @Inject(forwardRef(() => QuemMarcouService))
    private readonly quemMarcouService: QuemMarcouService,
    @Inject(forwardRef(() => ImagemService))
    private readonly imagemService: ImagemService,
  ) {}

  async listar(): Promise<Arvore[]> {
    return this.arvoreRepository.find({
      relations: ['quemMarcou', 'imagens'],
    });
  }

  async encontrar(id: number): Promise<Arvore> {
    return this.arvoreRepository.findOne({
      where: { id: id },
      relations: ['quemMarcou', 'imagens'],
    });
  }

  toArvore(dados: any): object {
    return {
      identificacao: dados.identificacao,
      familia: dados.familia,
      especie: dados.especie,
      detalhes: dados.detalhes,
      comProblema: dados.comProblema,
      latitude: dados.posicao.latitude,
      longitude: dados.posicao.longitude,
    };
  }

  async adicionar(dados: any): Promise<Arvore> {
    const arvore = this.arvoreRepository.create(this.toArvore(dados));
    arvore.quemMarcou = await this.quemMarcouService.adicionar(dados);

    console.log('gravando arvore:', arvore);
    return await this.arvoreRepository.save(arvore);
  }

  async atualizar(dados: any): Promise<number> {
    const arvore = this.arvoreRepository.create(this.toArvore(dados));
    arvore.quemMarcou = await this.quemMarcouService.adicionar(dados);

    console.log('atualizando arvore:', arvore);
    const resultado = await this.arvoreRepository.update(
      { id: dados.id },
      arvore,
    );

    return resultado.affected;
  }

  async remover(id: number): Promise<number> {
    console.log('apagando arvore identificada pelo id:', id);

    await this.imagemService.removerPorArvore(id);
    const resultado = await this.arvoreRepository.delete({ id: id });

    return resultado.affected;
  }
}
