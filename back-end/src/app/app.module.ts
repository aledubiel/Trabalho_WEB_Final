import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimaisModule } from 'src/animais/animais.module';
import { OngsModule } from 'src/ongs/ongs.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';


@Module({
  imports: [AnimaisModule, OngsModule, UsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
