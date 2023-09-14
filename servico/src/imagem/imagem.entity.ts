import Arvore from 'src/arvore/arvore.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ synchronize: false, name: 'imagens' })
class Imagem {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public arquivo: string;

  @ManyToOne(() => Arvore, (arvore) => arvore.imagens)
  public arvore: Arvore;
}

export default Imagem;
