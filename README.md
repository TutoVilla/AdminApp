# Administrator Management of Money
This is a web application for managing finances, built with Python and Flask for the backend, and Bootstrap, HTML, JavaScript, and CSS for the frontend. The database is implemented with MySQL, using relationships between tables with one-to-one, one-to-many, and many-to-many relationships.

## Getting Started
To use this application, you can clone the repository and run the following commands to set up the environment:

`docker-compose up --build`
This will create the database and download the necessary dependencies for the project.

## Customize enviroment variables
To customize the environment variables and update the necessary configurations, you can follow these steps:

Clone the repository to your local machine.

Open the repository in a text editor or IDE of your choice.

Look for a file named docker-compose.yml or a similar file that contains the Docker Compose configuration.

In that file, you will find the environment variables section. Look for the following lines:

environment:
  - MYSQL_ROOT_PASSWORD: 'ROOT'
  - MYSQL_PORT: '3306'

Modify the values of MYSQL_ROOT_PASSWORD and MYSQL_PORT according to your requirements. For example:

environment:
  - MYSQL_ROOT_PASSWORD: 'MyNewPassword'
  - MYSQL_PORT: '5432'

Save the changes to the file.

Additionally, if you need to update the port mapping for the MySQL service, locate the ports section in the docker-compose.yml file. You will find a line similar to:
ports:
  - '3306:3306'
If you want to change the port mapping, modify the values to match the desired host-to-container port mapping. For example, to map host port 5432 to container port 3306:
ports:
  - '5432:3306'
Remember to save the changes after modifying the file.

Once you have made these changes, you can proceed with running the docker-compose up --build command to set up the environment with your customized configurations.

## Usage
Once you have the environment set up, you can navigate to the application in your web browser and start managing your finances. Features include adding transactions, tracking expenses, setting budgets, and viewing reports.

## Acknowledgments
This project was developed with the support of ChatGPT, a language model trained by OpenAI, which provided guidance and suggestions throughout the development process.

## Technologies Used
- Python

- Flask
- MySQL
- Bootstrap
- HTML
- JavaScript
- CSS
- Docker

<img width="500" alt="Screenshot 2023-04-19 at 18 58 46" src="https://user-images.githubusercontent.com/80599426/233160624-84bb7113-16a1-4c28-9084-6ed9da4ad0bf.png">
