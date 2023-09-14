import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Encriptador } from './utils/encriptador';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get('alive')
  isAlive(): any {
    return Encriptador.encriptar(this.appService.isAlive());
  }

  @Get('configuracoes')
  getConfiguracao(): any {
    return Encriptador.encriptar({
      hostImagens: this.configService.get('IMAGENS_HOST'),
    });
  }
}
