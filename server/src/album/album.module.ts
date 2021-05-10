import { Module } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { AlbumController } from "./album.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Album, AlbumSchema } from "./schemas/album.schema";
import { ImageSchema } from "./schemas/image.schema";


@Module({
  imports: [
    MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema }]),
    MongooseModule.forFeature([{name: Image.name, schema: ImageSchema }])
  ],
  controllers: [AlbumController],
  providers: [AlbumService]
})
export class AlbumModule {}