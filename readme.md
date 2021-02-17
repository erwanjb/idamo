# Idamo (test)

## Les variables d'environnement sont à mettre dans un .env

- NODE_ENV => development ou production
- PORT => port du server node (back) (optionel defaut 8080)
- DEV_CLIENT_PORT => port du client en mode dévelopement (optionel defaut 8000)
- DB_URL => L'url de base Mongodb
- DB_NAME => Nom de la base de donnée Mongodb (optionel defaut idamo)
- API_URL => exemple http://localhost/ PORT

## Les Commandes
- pour build les dépendances `npm install`
- pour build le back : `npm run build-server`.
- pour lancer le back: `npm run start-server`.
- pour lancer en developpement le front : `npm run start-client`.
- pour build le front : `npm run build-client`.

