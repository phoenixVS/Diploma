import { Controller } from "@nestjs/common";


@Controller('/albums')
export class AlbumController {
  create() {

  }

  @Get()
  getAll() {
    return 'working!)'
  }

  getOne() {
    
  }
}