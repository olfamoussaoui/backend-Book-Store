import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  bookName: String,
  author: String,
  price: String,
});
