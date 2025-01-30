import express from "express";
const bookController = require("../controllers/bookCtrl");

const router = express.Router();

// Routes publiques pour la recherche de livres
router.get("/search", bookController.searchBooks);
router.get("/:googleBookId", bookController.getBookDetails);

export default router;