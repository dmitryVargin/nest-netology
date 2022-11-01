import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private books = [];

  create(createBookDto: CreateBookDto) {
    this.books.push(createBookDto);
    return createBookDto;
  }

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    return this.books.find((book) => book.id === id);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return (this.books = this.books.map((book) => {
      if (book.id === id) {
        return {
          ...book,
          ...updateBookDto,
        };
      }
      return book;
    }));
  }

  remove(id: number) {
    return (this.books = this.books.filter((book) => book.id !== id));
  }
}
