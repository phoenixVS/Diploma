import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare type ImageDocument = Image & Document;
export declare class Image {
    created: Date;
    image: number;
    comment: Comment[];
    description: string;
}
export declare const ImageSchema: mongoose.Schema<Document<Image, {}>, mongoose.Model<any, any>, undefined>;
