import { Module } from '@nestjs/common';
import { AnimaisService } from './animais.service';
import { AnimaisController } from './animais.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AnimaisController],
  providers: [AnimaisService],
  imports: [PrismaModule]
})
export class AnimaisModule {}
