import express from "express";
import usersRouter from "./users.routes";
import booksRouter from "./books.routes";
import libraryRouter from "./library.routes";
import reviewsRouter from "./reviews.routes";
const userAuthMiddleware = require("../middlewares/userAuth.middleware");

const router = express.Router();

// Route pour tester le serveur
router.get("/test", (req, res) => {
    res.status(200).send("Le serveur fonctionne correctement");
  });

// Public routes
router.use("/auth", usersRouter);
router.use("/books", booksRouter); // La recherche de livres est publique

// Protected routes
router.use("/users", userAuthMiddleware.authMiddleware, usersRouter);
router.use("/library", userAuthMiddleware.authMiddleware, libraryRouter);
router.use("/reviews", reviewsRouter);

export default router;