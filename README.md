# Deployment

look into this:
https://www.netlify.com/

# Debugging

## Debug Client

1. in one terminal:
   > cd client. Then run yarn start
2. in another terminal:
   > cd server. Then run yarn start
3. Debug using Client in .vscode

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

# TODOs

1. Add a Scale table with a name and notes column with FK in Day table
   Can be used to show how metrics were gotten for a given day
2. Add a Scale CRUD page for user
3. Add a Weight Units CRUD page for user
4. Find new library for CSV reading and wire the post bulk upload function
5. Add Scale select dropdown in the bulk upload page for the CSV upload process
6. Add a page to insert a single day of data and a post to accept this data
7. Add a CRUD page for the Day table for a user
8. Create automated UI tests
9. Create automated API tests
10. Add authorization for user login with third party login
11. Migrate Day table to have a user id column
12. Create automated build/deployment
13. Creating hosting for the site
14. Create TRELLO board with cards for all the todos
15. Make sure db connections are closed in the server side
