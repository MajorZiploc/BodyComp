# Purpose

A website to track body composition.

# Dev tools
- vscode
- nodejs
- yarn
- react.js
- hapi.js
- mysql

# Debugging

## Debug Client

1. in one terminal:
   > cd client. Then run yarn start
2. in another terminal:
   > cd server. Then run yarn start
3. Debug using Client in .vscode

### NOTE:
- Client can be tested independently of server. Set shouldMockData to true in ./client/src/config.ts

## Debug Server

Debug using Server in .vscode

# Javascript and Typescript Prettier Linting steps

1. install prettier
   > `npm install prettier`
2. put .prettierrc and .prettierignore at root of project
3. run
   > `npm install -g prettier`
4. Formatting whole project: run at the project root
   > `prettier --write "**/*"`
