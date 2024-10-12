## Description

Ce projet permet de justifier des textes envoyés à travers un API endpoint

## Technology Used

- Express
- Typescript
- JsonWebToken
- Jest
- Supertest

## Features

- **Justification de texte**: Justifie un texte donné à 80 caractères par ligne sans utiliser de bibliothèques externes
  
## Endpoints

- `POST /api/token`: Retourne un token si l'email est autorisé
  - **Request Body (Content-Type: application/json)**: `{"email": "EMAIL"}`
  - **Response (Content-Type: application/json)**: `{"token": "<jwt_token>"}`

- `POST /api/justify`: Justifie un texte à 80 caractères par ligne
  - **Headers (Authorization)**: `Bearer <jwt_token>`
  - **Request Body (Content-Type: application/json)**: `{"text": "CONTENU_DU_TEXTE"}`
  - **Response (Content-Type: text/plain)**: Texte justifié

## Installation

1. Cloner le repository:
   ```bash
   git clone https://github.com/Makoorr/tictac.git
   cd tictac
   ```

2. Installer les dépendances:
    ```bash
    npm install
    ```

3. Executer le serveur de development:
    ```bash
    npm run dev
    ```

## Pour tester le projet

Executer la commande suivante:
```
npm run test
```

## Pour lancer le projet

Executer la commande suivante:
```
npm start
```