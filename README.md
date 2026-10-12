# TaskFlow --- Gestion de projets et de tâches

TaskFlow est une application web full-stack développée avec la stack
MERN (MongoDB, Express.js, React et Node.js). Elle vise à faciliter
l'organisation des projets, la gestion des tâches, leur attribution aux
membres d'une équipe et le suivi de leur avancement.

## Sommaire

-   [Présentation](#-présentation)
-   [Objectifs](#-objectifs)
-   [Fonctionnalités](#-fonctionnalités)
-   [Technologies utilisées](#-technologies-utilisées)
-   [Architecture du projet](#-architecture-du-projet)
-   [Installation](#-installation)
-   [Lancement](#-lancement)
-   [Sécurité](#-sécurité)
-   [Tests](#-tests)
-   [Dockerisation](#-dockerisation)
-   [Améliorations futures](#-améliorations-futures)

## 📌 Présentation

TaskFlow centralise la gestion des projets et des tâches au sein d'une
équipe. L'application permet d'organiser le travail, de définir les
priorités, de gérer les échéances et de suivre l'avancement des tâches.

## 🎯 Objectifs

-   Centraliser les projets et les tâches.
-   Faciliter l'attribution des tâches aux membres.
-   Suivre les statuts, les priorités et les échéances.
-   Gérer les utilisateurs selon leurs rôles.
-   Sécuriser les accès aux ressources.
-   Mettre en place des tests automatisés.
-   Préparer l'application à une exécution avec Docker.

## ✨ Fonctionnalités

### Authentification

-   Inscription et connexion.
-   Authentification basée sur JWT.
-   Protection des routes privées.

### Gestion des utilisateurs

-   Gestion des rôles et des autorisations.
-   Gestion administrative selon les permissions.

### Gestion des projets

-   Création et consultation des projets.
-   Organisation des tâches par projet.

### Gestion des tâches

-   Création, consultation, modification et suppression selon les
    permissions.
-   Attribution des tâches aux utilisateurs.
-   Statuts : `todo`, `in-progress`, `done`.
-   Priorités : `low`, `medium`, `high`.
-   Gestion des échéances.

### Interface utilisateur

-   Interface React et navigation entre les pages.
-   Gestion de l'état global avec Redux Toolkit.
-   Interfaces adaptées aux rôles.

> Les fonctionnalités sont à considérer comme disponibles uniquement si
> elles sont effectivement implémentées et testées dans la version
> actuelle.

## 🛠️ Technologies utilisées

  Domaine                     Technologies
  --------------------------- ---------------------
  Frontend                    React, Vite
  Gestion d'état              Redux Toolkit
  Navigation                  React Router
  Styles                      Tailwind CSS
  Requêtes HTTP               Axios
  Backend                     Node.js, Express.js
  Base de données             MongoDB
  ODM                         Mongoose
  Authentification            JWT
  Hachage des mots de passe   bcrypt
  Validation                  Joi
  Tests                       Jest, Supertest
  Conteneurisation            Docker
  Versioning                  Git, GitHub

## 🏗️ Architecture du projet

``` text
TaskFlow/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── validators/
│   ├── tests/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── layouts/
│   │   └── pages/
│   └── package.json
└── README.md
```

*Cette arborescence est indicative. Adapte-la à la structure réelle du
dépôt.*

### Flux de fonctionnement

1.  L'utilisateur interagit avec l'interface React.
2.  Le frontend envoie des requêtes HTTP à l'API REST.
3.  Express traite les requêtes et applique les contrôles nécessaires.
4.  Les contrôleurs et services exécutent la logique métier.
5.  Mongoose communique avec MongoDB.
6.  Le backend renvoie une réponse au frontend.

## ⚙️ Prérequis

-   [Node.js](https://nodejs.org/)
-   npm
-   [MongoDB](https://www.mongodb.com/try/download/community) ou une
    instance accessible
-   [Git](https://git-scm.com/)
-   [Docker Desktop](https://www.docker.com/products/docker-desktop/)
    pour la conteneurisation

## 🚀 Installation

### 1. Cloner le dépôt

``` bash
git clone <URL_DU_DEPOT>
cd TaskFlow
```

Remplace `<URL_DU_DEPOT>` par l'URL réelle du dépôt GitHub.

### 2. Installer et configurer le backend

``` bash
cd backend
npm install
```

Créer un fichier `.env` dans `backend/` :

``` env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskflow
JWT_SECRET=replace_with_a_secure_secret
```

Adapte les variables à la configuration réelle. Ne publie jamais de
secrets sur GitHub.

### 3. Installer le frontend

``` bash
cd ../frontend
npm install
```

Si le frontend utilise `VITE_API_URL`, configure par exemple :

``` env
VITE_API_URL=http://localhost:5000/api
```

Le nom de la variable doit correspondre à celui utilisé dans le code.

## ▶️ Lancement

Démarrer MongoDB si une instance locale est utilisée.

**Terminal 1 --- Backend**

``` bash
cd backend
npm run dev
```

**Terminal 2 --- Frontend**

``` bash
cd frontend
npm run dev
```

Ouvre l'adresse indiquée par Vite, généralement `http://localhost:5173`.

## 🔐 API et sécurité

Le backend expose une API REST pour gérer les utilisateurs, les projets
et les tâches.

Les mécanismes utilisés ou prévus comprennent : - Authentification par
JWT. - Hachage des mots de passe avec bcrypt. - Middleware de protection
des routes. - Autorisations basées sur les rôles. - Validation des
données avec Joi. - Configuration via des variables d'environnement.

Les routes et permissions exactes dépendent de l'implémentation
actuelle.

## 🧪 Tests

Les tests automatisés utilisent Jest et Supertest. Depuis `backend/` :

``` bash
npm test
```

Les tests vérifient les comportements couverts par les scénarios
existants. N'indique pas de taux de couverture ou de résultats qui n'ont
pas été mesurés.

## 🐳 Dockerisation

La stratégie de conteneurisation vise à séparer le backend et la base de
données et à faciliter le déploiement : - Image Docker du backend. -
Conteneur MongoDB. - Réseau Docker pour la communication entre
conteneurs. - Volume Docker pour conserver les données MongoDB. -
Conteneurisation du frontend comme étape complémentaire.

**État actuel :** l'image Docker du backend a été construite et le
conteneur MongoDB a démarré. Le backend n'a pas encore démarré
correctement à cause d'un problème de chemin vers `server.js` : la
structure réelle doit être alignée avec le Dockerfile. La dockerisation
complète et celle du frontend restent à finaliser.

Le projet utilise des commandes Docker individuelles ; aucun
`docker-compose.yml` n'est requis pour la méthode retenue.

## 🔮 Améliorations futures

-   Finaliser la dockerisation du frontend et du backend.
-   Préparer un déploiement en production.
-   Étendre la couverture des tests.
-   Améliorer la journalisation et la gestion des erreurs.
-   Enrichir les tableaux de bord et le suivi des projets.

## 👨‍💻 Auteur

**Ayoub hanine**

Projet full-stack réalisé dans le cadre d'un projet de développement web
avec la stack MERN.

## 📄 Licence

Aucune licence n'est spécifiée pour le moment. Ajoute un fichier
`LICENSE` si le projet doit être distribué sous une licence
particulière.
