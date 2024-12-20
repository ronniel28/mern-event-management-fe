# MERN Event Management

This project is a full-stack event management application built using the MERN stack (MongoDB, Express, React, Node.js) and Vite for the frontend.

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Project Description

The MERN Event Management application allows users to create, manage, and register for events. It includes features such as user authentication, event registration, email notifications, and more.

## Features

- User authentication (login, registration)
- Create and manage events
- Register for events
- Cancel event registrations
- Email notifications for event registration and cancellation
- Responsive design

## Technologies Used

- **Frontend:**
  - React
  - Vite
  - Tailwind CSS
  - React Router

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - Nodemailer

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB instance running

### Clone the Repository

```bash
git clone https://github.com/your-username/mern-event-management.git
cd mern-event-management
```
### Install Dependencies

## Frontend

```bash
cd event-management-frontend
npm install
```

## Backend
```bash
cd event-management-backend
npm install
```

### Environment Variables
Create a .env file in the event-management-backend directory and add the following environment variables:

```bash
PORT=5001
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
CORS_ORIGIN=http://localhost:5173

EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```

### Running the Application

## Frontend

```bash
cd event-management-frontend
npm run dev
```

## Backend

```bash
cd event-management-backend
npm start
```

## Usage

- Open your browser and navigate to http://localhost:5173.
- Register a new user or log in with an existing account.
- Create, manage, and register for events.

## Environment Variables
The following environment variables need to be set in the .env file in the event-management-backend directory:
 - PORT: The port on which the backend
 - MONGO_URI: The MongoDB connection string.
 - JWT_SECRET: The secret key for JWT authentication.
 - CORS_ORIGIN: The origin URL for CORS configuration.
 - EMAIL_USER: The email address used for sending emails.
 - EMAIL_PASS: The password for the email address used for sending emails.