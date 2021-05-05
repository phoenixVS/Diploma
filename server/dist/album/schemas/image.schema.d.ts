import { Document } from 'mongoose';
export declare type ImageDocument = Image & Document;
export declare class Image {
    created: Date;
    image: number;
    comment: Comment[];
    description: string;
}
export declare const ImageSchema: import("mongoose").Schema<Document<Image, {}>, import("mongoose").Model<any, any>, undefined>;
