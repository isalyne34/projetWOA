# ShareAll

Lancer le front : npm run dev
    http://localhost:5173/
Lancer le back: node server.js
BDD: http://localhost:3000/




install node 
## Frontend

### Structure

```
├── src
│   ├── assets <-- images
│   ├── config <-- configurations
│   ├── components <-- composants de l'application (tout ceux qui ne sont pas des pages)
│   ├── layout <-- Définition du header et footer
│   ├── pages <-- Tout composants qui sont utilisés par le routeur
│   ├── index.css <-- Style du site
│   ├── main.tsx <-- Différentes routes du site
│   └── 
```


Si BDD vide : 
- Créer un voyage et refresh la page 
- Créer un utilisateur et l'ajouter au voyage
- Cliquer sur le voyage, et créer des dépenses en associant la dépense et à la personne qui l'a créée ! il faut créer l'utilisateur avant de pouvoir l'associer

Si BDD déjà existante:
- 

## Backend

### Structure
```
├── backend
│   ├── queries.js <-- Définition des différentes requêtes
│   ├── server.js <-- routes 
│   └── 
```
