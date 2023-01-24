import { BooksService } from './books.service';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../schemas/book.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

describe('books service', () => {
  let service: BooksService;
  let bookModel: Model<BookDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            exec: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findOneAndRemove: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    bookModel = module.get<Model<BookDocument>>(getModelToken(Book.name));
  });

  const mockBook: Book = {
    title: 'title',
    description: 'description',
    authors: 'authors',
    favorite: 'favorite',
    fileCover: 'fileCover',
    fileBook: 'fileBook',
    fileName: 'fileName',
    messages: ['message'],
  };

  describe('book', () => {
    const mockData: CreateBookDto = {
      authors: '',
      title: '',
    };

    it('findAll', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jest.spyOn(bookModel, 'find').mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(mockBook),
        }),
      });
      const result = await service.findAll();
      expect(result).toEqual(mockBook);
    });

    it('update', async () => {
      const spyUpdate = jest.spyOn(bookModel, 'findOneAndUpdate');
      await service.update('42', mockData);
      expect(spyUpdate).toBeCalled();
    });
    it('remove', async () => {
      const spyRemove = jest.spyOn(bookModel, 'findOneAndRemove');
      await service.remove('42');
      expect(spyRemove).toBeCalled();
    });
    it('findOne', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const spyFindOne = jest.spyOn(bookModel, 'findById').mockReturnValue({
        select: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(mockBook),
        }),
      });
      await service.findOne('42');
      expect(spyFindOne).toBeCalled();
    });
  });
});
