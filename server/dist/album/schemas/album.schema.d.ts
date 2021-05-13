import { Document } from 'mongoose';
import { Image } from './image.schema';
import * as mongoose from 'mongoose';
export declare type AlbumDocument = Album & Document;
export declare class Album {
    created: Date;
    image: number;
    author: string;
    images: Image[];
}
export declare const AlbumSchema: mongoose.Schema<Document<Album, {}>, mongoose.Model<any, any>, undefined>;
