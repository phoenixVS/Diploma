import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Image } from './image.schema';
import * as mongoose from 'mongoose';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop()
  created: Date;

  @Prop()
  image: number;

  @Prop()
  author: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }]} )
  images: Image[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);