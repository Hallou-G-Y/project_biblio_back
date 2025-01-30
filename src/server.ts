//Import
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "./config/config";
import { database } from "./config/db";
import apiRouter from "./routes/apiRouter";

const port = config.server.port || 8086;
const userMongoDb = config.database.login || "Stormy258:cRk7yqfwYmaNBtT5";
const server = express();
server.use(express.json());
// Connexion à la base de données
database(userMongoDb);

// Configurer CORS
server.use(cors({
    origin: 'http://localhost:3000', // Autoriser uniquement ce domaine
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
    credentials: true // Si vous utilisez des cookies
}));
// Middleware pour analyser le corps des requêtes JSON
server.use(bodyParser.json());

// Middleware pour analyser les données des formulaires URL-encoded
server.use(bodyParser.urlencoded({ extended: true }));
// Utilisation du routeur API
server.use("/api", apiRouter); // Assurez-vous que le routeur est monté ici

server.listen(port, () => {
  console.info(`Server running at http://localhost:${port}`);
});
