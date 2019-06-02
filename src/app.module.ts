import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { BooksService } from './books/books.service';
import { BooksController } from './books/books.controller';
import { MongooseModule} from '@nestjs/mongoose';
import config from './config/keys';

@Module({
  imports: [BooksModule, MongooseModule.forRoot(config.mongoURI)],
  controllers: [AppController, BooksController],
  providers: [AppService, BooksService],
})
export class AppModule {}
