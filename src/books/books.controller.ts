import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookValidationPipe } from './book.validataion.pipe';
import { JoiValidationPipe } from './joi.validation.pipe';
import { bookValidationSchema } from '../schemas/book.validation.schema';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UsePipes(new JoiValidationPipe(bookValidationSchema))
  @UsePipes(BookValidationPipe)
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    if (Math.random() > 0.75) {
      throw new Error('Unhandled Error');
    }
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
