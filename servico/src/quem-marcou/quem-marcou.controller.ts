/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Param, Post } from '@nestjs/common';
import QuemMarcou from './quem-marcou.entity';
import { QuemMarcouService } from './quem-marcou.service';

@Controller('quem-marcou')
export class QuemMarcouController {
  constructor(private readonly quemMarcouService: QuemMarcouService) {}

  @Get(':conta')
  async encontrar(@Param('conta') conta): Promise<QuemMarcou> {
    return this.quemMarcouService.encontrar(conta);
  }

  @Post()
  async adicionar(dados: any): Promise<any> {
    // jah foi cadastrado?
    const adicionado: QuemMarcou =
      await this.quemMarcouService.adicionar(dados);

    return { sucesso: adicionado != null };
  }
}
