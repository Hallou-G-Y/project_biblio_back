import express from "express";
import userModel from "../models/user.models";

module.exports = {
  // Récupérer le profil de l'utilisateur connecté
  getUserProfile: async (req: express.Request, res: express.Response) => {
    try {
      const userId = req.auth?.userId;
      
      const user = await userModel.findById(userId).select('-password');
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (err) {
      console.error("Get Profile Error:", err);
      res.status(500).json({ error: "Failed to get user profile" });
    }
  },

  // Mettre à jour le profil de l'utilisateur
  updateUserProfile: async (req: express.Request, res: express.Response) => {
    try {
      const userId = req.auth?.userId;
      const { pseudo, email } = req.body;

      // Vérifier si le pseudo ou l'email est déjà utilisé
      const existingUser = await userModel.findOne({
        _id: { $ne: userId },
        $or: [{ email }, { pseudo }]
      });

      if (existingUser) {
        return res.status(400).json({ error: "Email or pseudo already exists" });
      }

      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        { 
          $set: {
            ...(pseudo && { pseudo }),
            ...(email && { email })
          }
        },
        { new: true }
      ).select('-password');

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(updatedUser);
    } catch (err) {
      console.error("Update Profile Error:", err);
      res.status(500).json({ error: "Failed to update user profile" });
    }
  },

  // Récupérer tous les utilisateurs (admin seulement)
  getAllUsers: async (req: express.Request, res: express.Response) => {
    try {
      const users = await userModel.find().select('-password');
      res.status(200).json(users);
    } catch (err) {
      console.error("Get All Users Error:", err);
      res.status(500).json({ error: "Failed to get users" });
    }
  }
};