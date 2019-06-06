import { Document } from 'mongoose';

export interface Book extends Document {
    id?: string;
    bookName: string;
    author: string;
    description?: string;
    price: string;
}
