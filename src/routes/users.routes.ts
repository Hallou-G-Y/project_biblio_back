import express from "express";
const authController = require("../controllers/authCtrl");
const usersController = require("../controllers/usersCtrl");
const userAuthMiddleware = require("../middlewares/userAuth.middleware");


const router = express.Router();

// Auth routes
router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.post("/logout", authController.logout);

// Protected user routes
router.get("/profile", userAuthMiddleware.authMiddleware, usersController.getUserProfile);
router.put("/profile", userAuthMiddleware.authMiddleware, usersController.updateUserProfile);

// Admin routes
router.get("/all", userAuthMiddleware.authMiddleware, userAuthMiddleware.adminMiddleware, usersController.getAllUsers);

export default router;