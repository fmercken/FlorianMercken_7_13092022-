Ouvrir le Back puis ouvrir le terminal.
faite un npm install puis un npm start.

Ouvrir le front puis ouvrir le terminal.
faites un npm install.

faites la commande Install react-app-rewired.

Crée un nom de fichier config-overrides.js dans le  ROOT du  front/React project. NOT SRC the ROOT.
Ajouter le code suivant :

module.exports = function override(config, env) {
  console.log("React app rewired works!")
  config.resolve.fallback = {
    fs: false
  };
  return config;
};

Remplacer react-scripts dans la section scripts du package.json avec react-app-rewired. Exemple :

"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
  },
  
  Pour lancer le front faites un npm start.
