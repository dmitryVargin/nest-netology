import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, model } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop()
  description: string;
  @Prop()
  authors: string;
  @Prop()
  favorite: string;
  @Prop()
  fileCover: string;
  @Prop()
  fileName: string;
  @Prop()
  fileBook: string;
  @Prop([String])
  messages: string[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
