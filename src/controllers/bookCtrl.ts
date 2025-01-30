import express from "express";
import axios from "axios";
import Book from "../models/book.model";

const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";

module.exports = {
  // Recherche de livres via Google Books API
  searchBooks: async (req: express.Request, res: express.Response) => {
    try {
      const { query, page = 1, limit = 20 } = req.query;
      const startIndex = (Number(page) - 1) * Number(limit);
      
      const response = await axios.get(`${GOOGLE_BOOKS_API}?q=${query}&startIndex=${startIndex}&maxResults=${limit}`);
      
      const books = response.data.items.map((item: any) => ({
        googleBookId: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || [],
        description: item.volumeInfo.description,
        publishedDate: item.volumeInfo.publishedDate,
        imageLinks: item.volumeInfo.imageLinks,
        pageCount: item.volumeInfo.pageCount,
        categories: item.volumeInfo.categories || []
      }));

      res.status(200).json({
        books,
        totalItems: response.data.totalItems
      });
    } catch (err) {
      console.error("Search Books Error:", err);
      res.status(500).json({ error: "Failed to search books" });
    }
  },

  // Récupérer les détails d'un livre
  getBookDetails: async (req: express.Request, res: express.Response) => {
    try {
      const { googleBookId } = req.params;
      
      // Vérifier d'abord dans notre base de données
      let book = await Book.findOne({ googleBookId });
      
      if (!book) {
        // Si le livre n'existe pas dans notre DB, le récupérer via l'API
        const response = await axios.get(`${GOOGLE_BOOKS_API}/${googleBookId}`);
        const bookData = response.data.volumeInfo;
        
        book = await Book.create({
          googleBookId,
          title: bookData.title,
          authors: bookData.authors || [],
          description: bookData.description,
          publishedDate: bookData.publishedDate,
          imageLinks: bookData.imageLinks,
          pageCount: bookData.pageCount,
          categories: bookData.categories || []
        });
      }
      
      res.status(200).json(book);
    } catch (err) {
      console.error("Get Book Details Error:", err);
      res.status(500).json({ error: "Failed to get book details" });
    }
  }
};