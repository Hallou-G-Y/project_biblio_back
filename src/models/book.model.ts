import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  googleBookId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  authors: [{
    type: String,
    required: true
  }],
  description: {
    type: String
  },
  publishedDate: {
    type: String
  },
  imageLinks: {
    thumbnail: String,
    smallThumbnail: String
  },
  pageCount: {
    type: Number
  },
  categories: [{
    type: String
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  ratingsCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Book = mongoose.model("Book", bookSchema);
export default Book;