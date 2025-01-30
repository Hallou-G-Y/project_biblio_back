# Projet de Gestion de Bibliothèque

Ce projet est une application de gestion de bibliothèque qui permet aux utilisateurs de rechercher des livres, de gérer leur bibliothèque personnelle, de laisser des avis et d'interagir avec d'autres utilisateurs.

## Table des Matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies Utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [API](#api)
- [Contributions](#contributions)
- [Licence](#licence)

## Fonctionnalités

- Recherche de livres via l'API Google Books.
- Gestion de la bibliothèque personnelle des utilisateurs (ajout, mise à jour, suppression de livres).
- Système d'avis pour les livres.
- Authentification des utilisateurs.

## Technologies Utilisées

- **Backend**: Node.js, Express, Mongoose
- **Base de données**: MongoDB
- **Frontend**: React, Material-UI
- **API externe**: Google Books API

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/votre-repo.git
   cd votre-repo
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Configurez votre base de données MongoDB et mettez à jour les variables d'environnement si nécessaire.

4. Démarrez le serveur :
   ```bash
   npm start
   ```

5. Ouvrez votre navigateur et accédez à `http://localhost:8086` pour le backend et `http://localhost:3000` pour le frontend.

## Lien vers le Frontend

Le code source de la partie front de ce projet est disponible ici : [Frontend GitHub Repository](https://github.com/Hallou-G-Y/project_biblio_front)

## Utilisation

- **Inscription**: Les utilisateurs peuvent s'inscrire pour créer un compte.
- **Connexion**: Les utilisateurs peuvent se connecter pour accéder à leur bibliothèque personnelle.
- **Recherche de livres**: Utilisez la barre de recherche pour trouver des livres via l'API Google Books.
- **Gestion de la bibliothèque**: Ajoutez des livres à votre bibliothèque, mettez à jour leur statut ou supprimez-les.
- **Laisser un avis**: Évaluez les livres et laissez des commentaires.

## API

### Endpoints

- **POST /api/auth/signup**: Inscription d'un nouvel utilisateur.
- **POST /api/auth/login**: Connexion d'un utilisateur.
- **GET /api/books/search**: Recherche de livres.
- **GET /api/books/:googleBookId**: Récupérer les détails d'un livre.
- **GET /api/library**: Récupérer la bibliothèque de l'utilisateur.
- **POST /api/library/add**: Ajouter un livre à la bibliothèque.
- **PUT /api/library/:bookId**: Mettre à jour le statut d'un livre.
- **DELETE /api/library/:bookId**: Supprimer un livre de la bibliothèque.
- **POST /api/reviews**: Créer une nouvelle review.
- **GET /api/reviews/book/:bookId**: Récupérer les reviews d'un livre.
- **DELETE /api/reviews/:reviewId**: Supprimer une review.

## Contributions

Les contributions sont les bienvenues ! Veuillez soumettre une demande de tirage (pull request) pour toute amélioration ou correction.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.