import express from "express";
import bcrypt from "bcrypt";
import { generateTokenForUser } from "../utils/jwt.utils";
import userModel from "../models/user.models";

const SALT_ROUNDS = 10;

module.exports = {
  signUp: async (req: express.Request, res: express.Response) => {
    const { pseudo, email, password } = req.body;

    if (!pseudo || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // Check if user already exists
      const existingUser = await userModel.findOne({ $or: [{ email }, { pseudo }] });
      if (existingUser) {
        return res.status(400).json({ error: "Email or pseudo already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      // Create user
      const user = await userModel.create({ 
        pseudo, 
        email, 
        password: hashedPassword 
      });

      // Generate token
      const token = generateTokenForUser(user);

      res.status(201).json({ 
        userId: user._id,
        token 
      });
    } catch(err) {
      console.error("SignUp Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  signIn: async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const token = generateTokenForUser(user);

      res.status(200).json({
        userId: user._id,
        token,
        isAdmin: user.isAdmin
      });
    } catch(err) {
      console.error("SignIn Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  logout: (req: express.Request, res: express.Response) => {
    try {
      // Suppression du token d'authentification (si vous utilisez des cookies, par exemple)
      res.clearCookie("token"); // Remplacez "token" par le nom de votre cookie si nécessaire

      // Ou si vous utilisez un système de session, vous pouvez faire :
      // req.session.destroy();

      res.status(200).json({ message: "Déconnexion réussie" });
    } catch (err) {
      console.error("Logout Error:", err);
      res.status(500).json({ error: "Échec de la déconnexion" });
    }
  }
};