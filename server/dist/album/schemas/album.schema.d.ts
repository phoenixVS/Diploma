import { Document } from 'mongoose';
export declare type AlbumDocument = Album & Document;
export declare class Album {
    created: Date;
    image: number;
    author: string;
}
export declare const AlbumSchema: import("mongoose").Schema<Document<Album, {}>, import("mongoose").Model<any, any>, undefined>;
