// nao converter para uma importacao padrao (nao funcionara)
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class EncriptacaoService {
  constructor(private readonly configService: ConfigService) {}

  private getChave(): CryptoJS.lib.WordArray {
    return CryptoJS.enc.Utf8.parse(this.configService.get('encriptacao.chave'));
  }

  private getIV(): CryptoJS.lib.WordArray {
    return CryptoJS.enc.Utf8.parse(
      this.configService.get('encriptacao.iv').slice(0, 16),
    );
  }

  public encriptar(dados: any): string {
    const encriptado = CryptoJS.AES.encrypt(
      JSON.stringify(dados),
      this.getChave(),
      {
        iv: this.getIV(),
        mode: CryptoJS.mode.CBC,
      },
    ).toString();

    return encriptado;
  }

  public desencriptar(dados: string): any {
    const bytes = CryptoJS.AES.decrypt(decodeURI(dados), this.getChave(), {
      iv: this.getIV(),
      mode: CryptoJS.mode.CBC,
    });
    const desencriptado = CryptoJS.enc.Utf8.stringify(bytes);

    return JSON.parse(desencriptado);
  }
}
