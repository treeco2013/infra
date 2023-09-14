import { Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { ArvoreService } from './arvore.service';
import Arvore from './arvore.entity';
import { Encriptador } from 'src/utils/encriptador';

@Controller('arvore')
export class ArvoreController {
  constructor(private readonly arvoreService: ArvoreService) {}

  @Get()
  async listar(): Promise<any> {
    const arvores: Arvore[] = await this.arvoreService.listar();

    return Encriptador.encriptar({
      quantidade: arvores.length,
      arvores: arvores,
    });
  }

  @Get(':dados')
  async encontrar(@Param('dados') dados: any): Promise<any> {
    const arvore: Arvore = await this.arvoreService.encontrar(
      Number(Encriptador.desencriptar(dados).id),
    );
    return Encriptador.encriptar({
      encontrada: arvore != null,
      arvore: arvore,
    });
  }

  @Post(':dados')
  async adicionar(@Param('dados') dados: any): Promise<any> {
    const adicionado: Arvore = await this.arvoreService.adicionar(
      Encriptador.desencriptar(dados),
    );

    return Encriptador.encriptar({ sucesso: adicionado != null });
  }

  @Put(':dados')
  async atualizar(@Param('dados') dados: any): Promise<any> {
    const atualizados: number = await this.arvoreService.atualizar(
      Encriptador.desencriptar(dados),
    );

    return Encriptador.encriptar({
      sucesso: atualizados > 0,
      atualizados: atualizados,
    });
  }

  @Delete(':dados')
  async remover(@Param('dados') dados: any): Promise<any> {
    const apagados: number = await this.arvoreService.remover(
      Number(Encriptador.desencriptar(dados).id),
    );

    return Encriptador.encriptar({ sucesso: apagados > 0, apagados: apagados });
  }
}
