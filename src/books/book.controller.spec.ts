import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import * as request from 'supertest';
import { BooksModule } from './books.module';
import { BooksService } from './books.service';
import { INestApplication } from '@nestjs/common';

const mockBooks = {
  id: 1,
  title: 'title',
  description: 'description',
  authors: 'authors',
  favorite: 'favorite',
  fileCover: 'fileCover',
  fileBook: 'fileBook',
  fileName: 'fileName',
  messages: ['message'],
};

describe('BooksController', () => {
  let app: INestApplication;
  const bookService = {
    create: () => mockBooks,
    findAll: () => [mockBooks],
    findOne: () => mockBooks,
    update: () => mockBooks,
    remove: () => mockBooks,
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    })
      .overrideProvider(BooksService)
      .useValue(bookService)
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET books`, () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect(bookService.findAll());
  });
  it(`/GET book by id`, () => {
    return request(app.getHttpServer())
      .get('/books/1')
      .expect(200)
      .expect(bookService.findOne());
  });
  it(`/POST books`, () => {
    return request(app.getHttpServer())
      .get('/books/1')
      .expect(200)
      .expect(bookService.create());
  });
  it(`/PUT books`, () => {
    return request(app.getHttpServer())
      .put('/books/1')
      .expect(200)
      .expect(bookService.update());
  });
  it(`/DELETE books`, () => {
    return request(app.getHttpServer())
      .del('/books/1')
      .expect(200)
      .expect(bookService.remove());
  });
});
