import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Imagem from '../imagem/imagem.entity';
import QuemMarcou from '../quem-marcou/quem-marcou.entity';

@Entity({ synchronize: false, name: 'arvores' })
class Arvore {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public identificacao: string;

  @Column()
  public familia: string;

  @Column()
  public especie: string;

  @Column()
  public detalhes: string;

  @Column()
  public comProblema: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  public latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  public longitude: number;

  @ManyToOne(() => QuemMarcou, (quemMarcou: QuemMarcou) => quemMarcou.arvores)
  @JoinColumn()
  public quemMarcou: QuemMarcou;

  @OneToMany(() => Imagem, (imagem) => imagem.arvore)
  public imagens: Imagem[];
}

export default Arvore;
