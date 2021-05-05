import { Module } from "module";
import { AlbumService } from "./album.service";
import { AlbumController } from "./album.controller";


@Module({
  controllers: [AlbumController],
  providers: [AlbumService]
})
export class AlbumModule {}