# Utiliser une image Node.js pour le développement
FROM node:18

# Installer pnpm
RUN npm install -g pnpm

# Crée un répertoire de travail
WORKDIR /app

# Copie le reste des fichiers de l'application 
COPY . .

RUN pnpm install

# Expose le port que Vite utilise pour le développement
EXPOSE 5173

# Démarre le serveur Vite en mode développement
CMD ["pnpm", "dev"]