# Collab50

#### Video Demo: [https://youtu.be/TZ2PjGtvQK4](https://youtu.be/TZ2PjGtvQK4)

#### Description:

A project planning collaboration tool, built for teams, it allows multiple people to work on the same project, adding todos, and marking them as done, having different roles for the members and full control of access, I tried to make the website as accessible as possible with a little bit of animations.

> This is built as CS50's final project for the course [CS50x](https://cs50.harvard.edu/x).

#### Website URL: [https://collab50.herokuapp.com](https://collab50.herokuapp.com).

#### Setup Locally

To setup the project locally you have to follow these steps:

##### Step 1: Clone the repository

##### Step 2: Install Node.js

Make sure you have [Node.js](https://nodejs.org/en/) installed on your computer.

##### Step 3: Install PostgreSQL

Make sure you have PostgreSQL installed on your computer.

Then create a database using the command

```sql
CREATE DATABASE collab50;
```

And add the connection configuration to your `.env` file in the root of the project.

```
DATABASE_URL="postgresql://<user>:<password>@localhost/collab50"
```

##### Step 4: Build & Run the website

Install the node modules using the command:

```
npm install
```

Then run the migrations (create the database tables and relations) using the command:

```
npx prisma migrate deploy
```

Then build the app using the command:

```
npm run build
```

And once you build it you can start the website using the command:

```
npm start
```

Congrats! You have successfully setup the project locally. 🎉
