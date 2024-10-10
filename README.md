## Description

Ce projet permet de justifier des textes envoyés à travers un API endpoint

## Tech Stack

- Express
- Typescript

## Features

- **Justification de texte**: Justifie un texte donné à 80 caractères par ligne sans utiliser de bibliothèques externes
  
## Endpoints

- `POST /api/justify`: Justifie un texte à 80 caractères par ligne
  - **Request Body (Content-Type: application/json)**: `<texte>`
  - **Response**: Texte justifié

## Installation

1. Cloner le repository:
   ```bash
   git clone https://github.com/Makoorr/tictac.git
   cd tictac
   ```

2. Installer les dépendances
    ```bash
    npm install
    ```

3. Run the development server:
    ```bash
    npm run dev
    ```

## Pour lancer le projet
Executer la commande suivante:
```
npm start
```