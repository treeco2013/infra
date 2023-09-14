import { Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { ArvoreService } from './arvore.service';
import Arvore from './arvore.entity';
import { EncriptacaoService } from 'src/utils/encriptacao.service';

@Controller('arvore')
export class ArvoreController {
  constructor(
    private readonly arvoreService: ArvoreService,
    private readonly encriptacaoService: EncriptacaoService,
  ) {}

  @Get()
  async listar(): Promise<any> {
    const arvores: Arvore[] = await this.arvoreService.listar();

    return this.encriptacaoService.encriptar({
      quantidade: arvores.length,
      arvores: arvores,
    });
  }

  @Get(':dados')
  async encontrar(@Param('dados') dados: any): Promise<any> {
    const arvore: Arvore = await this.arvoreService.encontrar(
      Number(this.encriptacaoService.desencriptar(dados).id),
    );
    return this.encriptacaoService.encriptar({
      encontrada: arvore != null,
      arvore: arvore,
    });
  }

  @Post(':dados')
  async adicionar(@Param('dados') dados: any): Promise<any> {
    const adicionado: Arvore = await this.arvoreService.adicionar(
      this.encriptacaoService.desencriptar(dados),
    );

    return this.encriptacaoService.encriptar({ sucesso: adicionado != null });
  }

  @Put(':dados')
  async atualizar(@Param('dados') dados: any): Promise<any> {
    const atualizados: number = await this.arvoreService.atualizar(
      this.encriptacaoService.desencriptar(dados),
    );

    return this.encriptacaoService.encriptar({
      sucesso: atualizados > 0,
      atualizados: atualizados,
    });
  }

  @Delete(':dados')
  async remover(@Param('dados') dados: any): Promise<any> {
    const apagados: number = await this.arvoreService.remover(
      Number(this.encriptacaoService.desencriptar(dados).id),
    );

    return this.encriptacaoService.encriptar({
      sucesso: apagados > 0,
      apagados: apagados,
    });
  }
}
