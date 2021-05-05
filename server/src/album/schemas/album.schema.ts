import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop()
  created: Date;

  @Prop()
  image: number;

  @Prop()
  author: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);