import express from "express";
import Review from "../models/review.model";
import Book from "../models/book.model";
import { ObjectId as mongooseObjectID} from "mongoose";

module.exports = {
  // Créer une review
  createReview: async (req: express.Request, res: express.Response) => {
    try {
      const { bookId, rating, comment } = req.body;
      const userId = req.auth?.userId;
      const review = await Review.create({
        userId,
        bookId: String(bookId),
        rating,
        comment
      });

      // Mettre à jour la note moyenne du livre
      const reviews = await Review.find({ bookId });
      
      const averageRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
      
      /* await Book.findByIdAndUpdate(bookId, {
        averageRating,
        ratingsCount: reviews.length
      }); */

      res.status(201).json(review);
    } catch (err) {
      console.error("Create Review Error:", err);
      res.status(500).json({ error: "Failed to create review" });
    }
  },
  // Récupérer les reviews d'un livre
  getBookReviews: async (req: express.Request, res: express.Response) => {
    try {
      const { bookId } = req.params;
      const { page = 1, limit = 10 } = req.query;
      
      const reviews = await Review.find({ bookId })
        .populate('userId', 'pseudo')
        .sort({ createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));

      const total = await Review.countDocuments({ bookId });
      const data = {
        reviews,
        total,
        pages: Math.ceil(total / Number(limit))
      }
      res.status(200).json(data);
    } catch (err) {
      console.error("Get Reviews Error:", err);
      res.status(500).json({ error: "Failed to get reviews" });
    }
  },
  // Supprimer une review
  deleteReview: async (req: express.Request, res: express.Response) => {
    try {
      const { reviewId } = req.params;
      const userId = req.auth?.userId;

      const review = await Review.findOne({ _id: reviewId, userId });
      
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }

      await review.deleteOne();

      // Mettre à jour la note moyenne du livre
      const bookId = review.bookId;
      const reviews = await Review.find({ bookId });
      const averageRating = reviews.length > 0 
        ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
        : 0;
      
      /* await Book.findByIdAndUpdate(bookId, {
        averageRating,
        ratingsCount: reviews.length
      }); */

      res.status(200).json({ message: "Review deleted successfully" });
    } catch (err) {
      console.error("Delete Review Error:", err);
      res.status(500).json({ error: "Failed to delete review" });
    }
  }
};