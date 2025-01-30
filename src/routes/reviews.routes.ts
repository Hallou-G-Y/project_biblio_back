import express from "express";
const reviewController = require("../controllers/reviewCtrl");
const userAuthMiddleware = require("../middlewares/userAuth.middleware");

const router = express.Router();

// Routes pour les reviews
router.post("/", userAuthMiddleware.authMiddleware, reviewController.createReview);
router.get("/book/:bookId", reviewController.getBookReviews);
//router.post("/:reviewId/like", reviewController.toggleLikeReview);
router.delete("/:reviewId",userAuthMiddleware.authMiddleware, reviewController.deleteReview);

export default router;