import { Module } from '@nestjs/common';
import { EncriptacaoService } from './encriptacao.service';

@Module({
  providers: [EncriptacaoService],
  exports: [EncriptacaoService],
})
export class EncriptacaoModule {}
