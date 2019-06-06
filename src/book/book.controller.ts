import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from '../Interfaces/book';
import { BookDTO } from './book.dto';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Get()
    findAll(): Promise<Book[]> {
        return this.bookService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<Book> {
        return this.bookService.findOne(id);
    }

    @Post()
    create(@Body() createBookDto: BookDTO): Promise<Book> {
        return this.bookService.create(createBookDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<Book> {
        return this.bookService.delete(id);
    }

    @Put(':id')
    update(@Body() updateBookDto: BookDTO, @Param('id') id): Promise<Book> {
        return this.bookService.update(id, updateBookDto);
    }
}
