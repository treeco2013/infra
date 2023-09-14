// nao converter para uma importacao padrao (nao funcionara)
import * as CryptoJS from 'crypto-js';

const CHAVE_DE_ENCRIPTACAO = CryptoJS.enc.Utf8.parse(
  'ECRAp5ja6DKADoukZm8SapZoLSd5KN9S',
);

const IV_DE_ENCRIPTACAO = CryptoJS.enc.Utf8.parse(
  'a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|x|y|w|z'.slice(0, 16),
);

export class Encriptador {
  static encriptar(dados: any): string {
    console.log('iv:', IV_DE_ENCRIPTACAO);

    const encriptado = CryptoJS.AES.encrypt(
      JSON.stringify(dados),
      CHAVE_DE_ENCRIPTACAO,
      {
        iv: IV_DE_ENCRIPTACAO,
        mode: CryptoJS.mode.CBC,
      },
    ).toString();

    return encriptado;
  }

  static desencriptar(dados: string): any {
    console.log('desencriptar.dados:', decodeURI(dados));

    const bytes = CryptoJS.AES.decrypt(decodeURI(dados), CHAVE_DE_ENCRIPTACAO, {
      iv: IV_DE_ENCRIPTACAO,
      mode: CryptoJS.mode.CBC,
    });
    const desencriptado = CryptoJS.enc.Utf8.stringify(bytes);

    return JSON.parse(desencriptado);
  }
}
