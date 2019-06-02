import { Injectable } from '@nestjs/common';
import { Book } from './interfaces/Book';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDTO } from './dto/CreateBookDTO';

@Injectable()
export class BooksService {
    // private readonly books: Book[] = Books;

    constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) { }

    async findAll(): Promise<Book[]> {
        return await this.bookModel.find();
    }

    async findOne(id: string): Promise<Book> {
        return await this.bookModel.findOne({ _id: id });
    }

    async create(createBookDto: CreateBookDTO): Promise<Book> {
        const createdBook = new this.bookModel(createBookDto);
        return await createdBook.save();
    }

    async delete(id: string): Promise<Book> {
        return await this.bookModel.findByIdAndRemove(id);
    }

    async update(id: string, book: Book): Promise<Book> {
        return await this.bookModel.findByIdAndUpdate(id, book, { new: true });
    }
}
