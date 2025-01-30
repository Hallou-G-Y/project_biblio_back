import express from "express";
import UserLibrary from "../models/userLibrary.model";
import Book from "../models/book.model";

module.exports = {
  // Ajouter un livre à la bibliothèque
  addToLibrary: async (req: express.Request, res: express.Response) => {
    try {
      const { googleBookId, status } = req.body;
      const userId = req.auth?.userId;

      const userLibrary = await UserLibrary.create({
        userId,
        bookId: googleBookId,
        status,
        startDate: status === 'reading' ? new Date() : undefined
      });

      res.status(201).json(userLibrary);
    } catch (err) {
      console.error("Add to Library Error:", err);
      res.status(500).json({ error: "Failed to add book to library" });
    }
  },

  // Mettre à jour le statut d'un livre
  updateBookStatus: async (req: express.Request, res: express.Response) => {
    try {
      const { bookId } = req.params;
      const { status, rating, review } = req.body;
      const userId = req.auth?.userId;

      const update: any = { status };
      
      if (status === 'reading' && !update.startDate) {
        update.startDate = new Date();
      }
      
      if (status === 'completed') {
        update.finishDate = new Date();
      }
      
      if (rating) update.rating = rating;
      if (review) update.review = review;

      const userLibrary = await UserLibrary.findOneAndUpdate(
        { userId, bookId: String(bookId) },
        update,
        { new: true }
      );

      if (!userLibrary) {
        return res.status(404).json({ error: "Book not found in library" });
      }

      res.status(200).json(userLibrary);
    } catch (err) {
      console.error("Update Status Error:", err);
      res.status(500).json({ error: "Failed to update book status" });
    }
  },

  // Récupérer la bibliothèque de l'utilisateur
  getUserLibrary: async (req: express.Request, res: express.Response) => {
    try {
      const userId = req.auth?.userId;
      const { status } = req.query;

      const query: any = { userId };
      if (status) query.status = status;

      const userLibrary = await UserLibrary.find(query)
        .populate('')
        .sort({ updatedAt: -1 });

      res.status(200).json(userLibrary);
    } catch (err) {
      console.error("Get Library Error:", err);
      res.status(500).json({ error: "Failed to get user library" });
    }
  },

  // Supprimer un livre de la bibliothèque
  removeFromLibrary: async (req: express.Request, res: express.Response) => {
    try {
      const { bookId } = req.params;
      const userId = req.auth?.userId;

      const result = await UserLibrary.findOneAndDelete({ userId, bookId });

      if (!result) {
        return res.status(404).json({ error: "Book not found in library" });
      }

      res.status(200).json({ message: "Book removed from library" });
    } catch (err) {
      console.error("Remove from Library Error:", err);
      res.status(500).json({ error: "Failed to remove book from library" });
    }
  }
};