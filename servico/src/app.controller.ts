import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { EncriptacaoService } from './utils/encriptacao.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly encriptacaoService: EncriptacaoService,
  ) {}

  @Get('alive')
  isAlive(): any {
    return this.encriptacaoService.encriptar(this.appService.isAlive());
  }

  @Get('configuracoes')
  getConfiguracao(): any {
    return this.encriptacaoService.encriptar({
      hostImagens: this.configService.get('IMAGENS_HOST'),
    });
  }
}
