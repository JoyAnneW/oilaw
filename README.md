# Oilaw

CodeOp Full Stack Feature Extension. This web app allows women in need to connect with lawyers who can give them free legal advice.

## Setup Instructions

Two terminal windows are required:

- Backend: Run `yarn migrate` to create the database tables. Run `yarn` in the project's root folder to install Node dependencies. `yarn start` in the root folder starts the Express server on port 5000.
- Frontend: `cd client` to navigate to the client folder, then run `yarn` to install React dependencies. `yarn start` starts the client server on port 3000.

A `.env` file is needed to setup the database.

## Features

- Clients can submit only one request for assistance via a contact form on the landing page.
- Lawyers can sign up to create an account. Passwords are hashed and stored in the database and a JWT token is issued to authenticate users.
- In their account, lawyers can see all information about the cases assigned to them, change their availability and mark their cases as resolved. One lawyer can work on more than one case.
- The admin account shows all lawyers, all case and client details and all assignments. The admin can accept cases, assign cases to lawyers and track the lifecycle of all cases.

## Technologies

### Frontend

- React
- Tailwind CSS
- React Router

### Backend

- MySQL Database
- Node JS
- Express JS
- Postman

### Packages

- React-icons
- bcrypt
- jsonwebtoken
- React-toastify

## MySQL Database Schema

![Practicum Database Schema](/model/Oilaw%20DB%20Schema.png)

_This is a student project that was created at [CodeOp](http://CodeOp.tech), a full stack development bootcamp in Barcelona._
