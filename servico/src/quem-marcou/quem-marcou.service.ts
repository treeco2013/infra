import { InjectRepository } from '@nestjs/typeorm';
import QuemMarcou from './quem-marcou.entity';
import { Repository } from 'typeorm';

export class QuemMarcouService {
  constructor(
    @InjectRepository(QuemMarcou)
    private quemMarcouRepository: Repository<QuemMarcou>,
  ) {}

  toQuemMarcou(dados: any): object {
    return {
      conta: dados.quemMarcou.conta,
      nome: dados.quemMarcou.nome,
    };
  }

  async encontrar(conta: string): Promise<QuemMarcou> {
    return await this.quemMarcouRepository.findOneBy({ conta: conta });
  }

  async adicionar(dados: any): Promise<QuemMarcou> {
    let quemMarcou: QuemMarcou = await this.encontrar(dados.conta);

    if (!quemMarcou) {
      const entidade = this.quemMarcouRepository.create(
        this.toQuemMarcou(dados),
      );

      console.log('gravando quem marcou:', entidade);
      quemMarcou = await this.quemMarcouRepository.save(entidade);
    } else {
      console.log('encontrei quem marcou:', quemMarcou);
    }

    return quemMarcou;
  }
}
