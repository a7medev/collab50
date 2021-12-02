# Collab50

A project planning collaboration tool, built for teams, it allows multiple people to work on the same project, adding todos, and marking them as done, having different roles for the members and full control of access, I tried to make the website as accessible as possible with a little bit of animations.

Once you open the website you can see the home page and you can register or login if you have an existing account and the login session is remembered for 7 days, then you're automatiacally logged out.

After login you are redirected to the projects page where you see all the projects you have created and you can create a new one, if you click on a project you can see the members and todos of the project, allowing you to add members from Collab50 to collaborate with you on your project as a viewer that can see the progress of the project, an editor that can add/manage project todo, or an owner that can add/remove members in the project.

The data in the website is updated in roughly realtime, which allows members and users to see the data and project change in action which makes collaboration much more easy and effecient!

By utilizing the powers of web ARIA, the full website is accessible, you can navigate between website elements using the keyboard pretty easily, or use a voice over technology if you're blind or having eye issues.

> This is built as a final project for the course [CS50x](https://cs50.harvard.edu/x).

## Video Demo: [https://youtu.be/TZ2PjGtvQK4](https://youtu.be/TZ2PjGtvQK4)

## Website URL: [https://collab50.herokuapp.com](https://collab50.herokuapp.com).

## Website Features

- Register/Login
- Create a project
- Add project todos
- Add/Remove project members

## Technologies

- TypeScript
- React.js
- Next.js (for server-side rendering)
- Prisma (for database)
- Formik & Yup (for validation)
- TailwindCSS (for styling)
- Framer Motion (animations)
- Reach UI (accessibility)

## Project Structure

- `components/*`: The UI components used in the website.
- `config/*`: The config files (prisma config file).
- `images/*`: The images used in the website.
- `pages/*`: The page components of the website.
- `pages/api/*`: The API routes of the website (the backend side).
- `prisma/*`: The Prisma schema and database migrations.
- `public/*`: Website public files (favicon for example).
- `styles/*`: CSS files used in the website.
- `types/*`: TypeScript types used in the project.
- `utils/*`: Utility functions used across the project.
- `validation/*`: Yup validation schemas used for forms and API routes.

## Setup Locally

To setup the project locally you have to follow these steps:

### Step 1: Clone the repository

### Step 2: Install Node.js

Make sure you have [Node.js](https://nodejs.org/en/) installed on your computer.

### Step 3: Install PostgreSQL

Make sure you have PostgreSQL installed on your computer.

Then create a database using the command

```sql
CREATE DATABASE collab50;
```

And add the connection configuration to your `.env` file in the root of the project.

```
DATABASE_URL="postgresql://<user>:<password>@localhost/collab50"
```

### Step 4: Build & Run the website

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
