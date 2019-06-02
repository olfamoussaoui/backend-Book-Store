import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CreateBookDTO } from './dto/CreateBookDTO';
import { BooksService } from './books.service';
import { Book } from './interfaces/Book';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Get()
    findAll(): Promise<Book[]> {
        return this.booksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<Book> {
        return this.booksService.findOne(id);
    }

    @Post()
    create(@Body() createBookDto: CreateBookDTO): Promise<Book> {
        return this.booksService.create(createBookDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<Book> {
        return this.booksService.delete(id);
    }

    @Put(':id')
    update(@Body() updateBookDto: CreateBookDTO, @Param('id') id): Promise<Book> {
        return this.booksService.update(id, updateBookDto);
    }
}
