# MEAN-stack-boilerplate
A simple MEAN stack bilerplate that includes frontend and backend. In this project I use Angular/NodeJs/Express/Sequelize/Mysql. Feel free to contribute. This is a work in progress and I created it to learn the MEAN stack(Without MongoDB) please be aware that I am a junior.

## Frontend

### Installation

Make sure you have [Angular CLI](https://cli.angular.io/) installed on your system.

npm install -g @angular/cli

Clone the repository and navigate to the frontend directory:

git clone https://github.com/u-alexandru/MEAN-stack-boilerplate.git
cd project/frontend

Install the dependencies:

npm install

### Important Note

Due to issues with the project's template, it is necessary to install Angular with the `--force` flag. This ensures that the installation overrides any potential conflicts and allows the project to work properly.

npm install -g @angular/cli --force

### Usage

To start the frontend development server, run the following command:

ng serve

The application will be accessible at `http://localhost:4200`.

## Backend

### Installation

Clone the repository and navigate to the backend directory:

git clone https://github.com/u-alexandru/MEAN-stack-boilerplate.git
cd project/backend

Install the dependencies:

npm install

### Configuration

The backend requires certain configuration files to run correctly. 

1. Database Configuration: Set up your database configuration by editing the `config.json` file located in `/backend/config/`. Adjust the necessary parameters according to your database setup.

2. Redis Configuration: Create a `.env` file in the backend directory and add the following configuration for Redis:

REDIS_HOST=your-redis-host
REDIS_PORT=your-redis-port
REDIS_PASSWORD=your-redis-password

### Migration and Seed Data

To migrate the database schema and populate it with seed data, follow these steps:

1. Make sure your database is properly configured in `config.json`.

2. Run the migration command to create the required tables:

npx sequelize-cli db:migrate

3. After the migration is completed, run the seed command to populate the database with default data, including the account "admin@example.com" with the password "password":

npx sequelize-cli db:seed:all

### Usage

To start the backend server, run the following command:

npm start

The backend server will be accessible at `http://localhost:3000`.

## Contributing

This project was created for learning purposes, and contributions are welcome. If you would like to contribute, please follow these guidelines:

1. Fork the repository and create a new branch for your feature or bug fix.

2. Make your changes and ensure that the project still runs successfully.

3. Commit your changes and push them to your fork.

4. Open a pull request, and provide a detailed description of your changes.

Thank you for your interest in contributing to this project!
