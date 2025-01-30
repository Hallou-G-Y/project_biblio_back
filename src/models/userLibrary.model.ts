import mongoose from "mongoose";

const userLibrarySchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ['reading', 'completed', 'want-to-read'],
    default: 'want-to-read'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    maxLength: 1000
  },
  startDate: {
    type: Date
  },
  finishDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Index pour s'assurer qu'un utilisateur ne peut pas ajouter le même livre plusieurs fois
userLibrarySchema.index({ userId: 1, bookId: 1 }, { unique: true });

const UserLibrary = mongoose.model("UserLibrary", userLibrarySchema);
export default UserLibrary;