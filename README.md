# 🌟 [Projet Cityzen](https://cityzen.up.railway.app/)

**Cityzen est une application web réalisé en groupe dans le cadre du projet de fin de formation de l'école O'clock. Cette dernière a été conçue pour informer sur les activités locales. Son fonctionnement est simple : l’utilisateur saisit le nom d’une ville, et l’application lui propose une liste des activités disponibles dans cette localité, accompagnée d’une carte interactive pour une navigation facile.**


![Screenshot de l'application](/public/screenshot-home.png)

## ⭐ Fonctionnalitées de l'application :

- Créer un compte utilisateur
- Se connecter
- Rechercher une ville pour afficher ses activités
- Accéder à la page détail d'une activité
- Ajouter / Supprimer / modifier une activité
- Ajouter ou supprimer une activité de ses favoris
- Mofifier son pseudo
- Modifier son mot de passe
- Supprimer son compte

**Ce repo contient le code front-end de Cityzen et est dédié à la partie technique de ses fonctionnalités, si vous souhaitez voir la partie technique du back-end [cliquez-ici](https://github.com/PeterLeSouchu/Cityzen-back)**

## 🛠️ Fonctionnement du front-end :

### ⚙️ 1. Architecture

- Single Page Application avec Vite, React et TypeScript.
- Tailwind CSS pour le style avec des classes CSS personnalisées.
- Utilisation d'ESLint AirBnb.
-

### 📦 2. Store

- Mise en place d'un store redux.
- 1 reducer pour l'utilisateur avec des states pour les informations de l'utilisateur (activités favorites, email, pseudo ...).
- 1 reducer pour les activités avec 1 state des activités recherchés (car partagé sur plusieurs composants) et un state logged utilisé uniquement lors de la recherche d'activités.
- Persistance des données avec le local storage.

### 🔒 3. Sécurité

- Mise en place d'une route protégée, englobant toutes celle nécessitant une authentification et qui utilise le state "logged" du store afin de donner accès ou non à certaines routes.
- Prémunition des attaques XSS avec React.
- Vérification des données pour certains formulaires.

### 🧪 4. Tests unitaires

- Ajout de tests unitaires avec Vitest pour le composant <Footer/>, visant à vérifier la présence d’un lien pointant vers les mentions légales et à s'assurer que l’année affichée correspond à l’année en cours.

### 🗺️ 5. Map intéractive Leaflet

- Utilisation de l'API Leaflet pour implémenter une map intéractive.
- Carte qui pointe précisement une activité pour mieux informer l'utilisateur sur sa localisation.

### 💻 6. Technologies utilisées

- React avec TypeScript
- [Tailwind CSS](https://tailwindcss.com/) pour le style
- [Axios](https://www.npmjs.com/package/axios) pour les requêtes API
- [React-redux](https://react-redux.js.org/) pour gérer les states partagés dans mon app
- [React toastify](https://www.npmjs.com/package/react-toastify) pour les notifications
- [react-leaflet](https://react-leaflet.js.org/) pour la map intéractive
- [Vitest](https://vitest.dev/) pour les tests unitaires
- [Framer-motion](https://motion.dev/) pour l'animation du coeur lors de l'ajout d'une activité au favoris

### ⬇️ 6. Points à ajouter ou améliorer :

- Se prémunir des attaques par force brute avec un captcha pour la connnexion.
- Mettre en place une pagination sur la page recherche pour gagner en rapidité et ainsi améliorer l'expérience utilisateur.
- Améliorer la gestion d'erreur et éviter de faire un switch dans la fonction permettant de gérer les erreurs provenant du back. Il faudrait d'abord compléter la gestion d'erreurs en back avant de finaliser celles en front.
- Ré-organiser et nettoyer le code pour une meilleure lisibilité.
- Utiliser une librairie pour valider les données des formulaires, comme ZOD ou YUP car les seules validations faites sont sur la correspondance des mots de passe lors de l'inscription et de la modification du mot de passe.

🚨: Cityzen est un projet réalisé en groupe ( mais aussi mon tout premier projet fullstack ) durant mon bootcamp chez O'Clock. Le projet n'est pas encore totalement complet, je pense notamment à la gestion d'erreurs, ou à la lisibilité du code qui pourrait être plus aéré et plus fractionné. Cependant ce dernier m'a permis de découvrir beaucoup de technologies et de notions, et ce en grande partie grâce à l'équipe du projet.

Collaborateurs :

- [Ryad](https://github.com/RyadC)
- [Emmanuel](https://github.com/CHARLESEmmanuel-25)
- [Ziad](https://github.com/ziadelidrissi)
- [Wilson](https://github.com/SemedoWilson)
