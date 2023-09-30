import { Request, Response } from "express";
import  Book  from "../models/Book";
import  Author from "../models/Author";
import BookAuthor from '../models/BookAuthor'; 

const books: Book[] = [];
let bookIdCounter = 1;

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, chapters, pages, authors } = req.body;

    if (!title || !chapters || !pages || !authors || authors.length === 0) {
      res.status(400).json({ error: "Todos los campos son obligatorios" });
      return;
    }

    if (
      typeof chapters !== "number" ||
      typeof pages !== "number" ||
      chapters <= 0 ||
      pages <= 0
    ) {
      res
        .status(400)
        .json({ error: "Chapters y Pages deben ser números positivos" });
      return;
    }

    if (
      !Array.isArray(authors) ||
      authors.some((authorId) => typeof authorId !== "number" || authorId <= 0)
    ) {
      res
        .status(400)
        .json({ error: "Authors debe ser un arreglo de números positivos" });
      return;
    }

    const book = await Book.create({
      title,
      chapters,
      pages,
    });

    if (authors && authors.length > 0) {
      const authorIds = authors.map((authorId: number) => authorId);
      const authorModels = await Author.findAll({
        where: {
          id: authorIds,
        },
      });

      await Promise.all(
        authorIds.map(async (authorId: number) => {
          const existingRelation = await BookAuthor.findOne({
            where: {
              BookId: book.id,
              AuthorId: authorId,
            },
          });

          if (!existingRelation) {
            await BookAuthor.create({
              BookId: book.id,
              AuthorId: authorId,
            });
          }
        })
      );

    }

    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el libro" });
  }
};

export const getAllBooks = (req: Request, res: Response) => {
  res.json(books);
};

export const calculateAvgPagesPerChapter = (req: Request, res: Response) => {
  const bookId = Number(req.params.id);
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    res.status(404).json({ error: "Libro no encontrado" });
    return;
  }

  const avgPagesPerChapter = (book.pages / book.chapters).toFixed(2);

  res.json({
    bookId: book.id,
    avgPagesPerChapter,
  });
};
