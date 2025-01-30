import express from "express";
const userLibraryController = require("../controllers/userLibraryCtrl");

const router = express.Router();

// Routes pour la bibliothèque personnelle
router.get("/", userLibraryController.getUserLibrary);
router.post("/add", userLibraryController.addToLibrary);
router.put("/:bookId", userLibraryController.updateBookStatus);
router.delete("/:bookId", userLibraryController.removeFromLibrary);

export default router;