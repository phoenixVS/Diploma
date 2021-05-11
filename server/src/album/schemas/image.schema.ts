import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image {
  @Prop()
  created: Date;

  @Prop()
  image: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]} )
  comment: Comment[];

  @Prop()
  description: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);