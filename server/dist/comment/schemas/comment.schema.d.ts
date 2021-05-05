import { Document } from 'mongoose';
export declare type CommentDocument = Comment & Document;
export declare class Comment {
    created: Date;
    value: string;
    author: string;
}
export declare const CommentSchema: import("mongoose").Schema<Document<Comment, {}>, import("mongoose").Model<any, any>, undefined>;
