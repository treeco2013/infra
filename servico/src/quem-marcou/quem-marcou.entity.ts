import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Arvore from '../arvore/arvore.entity';

@Entity({ synchronize: false })
class QuemMarcou {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome: string;

  @Column()
  public conta: string;

  @OneToMany(() => Arvore, (arvore: Arvore) => arvore.quemMarcou)
  public arvores: Arvore[];
}

export default QuemMarcou;
