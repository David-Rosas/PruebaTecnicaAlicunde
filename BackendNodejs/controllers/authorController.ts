import { Request, Response } from 'express';
import  Author  from '../models/Author';

const authors: Author[] = [];
let authorIdCounter = 1;

export const createAuthor = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
    
        if (!name) {
            res.status(400).json({ error: 'El nombre del autor es obligatorio' });
            return;
          }
    
          const author = await Author.create({
            name,
          });
      
          res.status(201).json(author);
      } catch (error) {
        res.status(400).json({ error: 'Error al crear el autor' });
      }
};

export const getAllAuthors = (req: Request, res: Response) => {
    res.json(authors);
};