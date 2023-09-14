import { Module } from '@nestjs/common';
import { QuemMarcouController } from './quem-marcou.controller';
import { QuemMarcouService } from './quem-marcou.service';
import QuemMarcou from './quem-marcou.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([QuemMarcou])],
  controllers: [QuemMarcouController],
  providers: [QuemMarcouService],
  exports: [QuemMarcouService],
})
export class QuemMarcouModule {}
