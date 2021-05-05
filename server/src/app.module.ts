import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumModule } from './album/album.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.w72yf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
    AlbumModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}