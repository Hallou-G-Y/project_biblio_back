import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookId: {
    type: String,
    ref: 'Book',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    maxLength: 1000
  }
}, {
  timestamps: true
});

// Un utilisateur ne peut laisser qu'une seule review par livre
reviewSchema.index({ userId: 1, bookId: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);
export default Review;