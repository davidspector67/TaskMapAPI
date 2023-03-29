# TaskMap Tree-Structured API

## Description

This is a NestJS API, which is indended to serve as the backend of a full stack user-based tree-structured task organization web application in the future. It was developed using Test-driven development (TDD). 
###
The application uses long lived JSON Web Token (JWT) authentication and bcrypt password hashes to store user data. It uses the TypeORM library to connect to a local SQL database containing all user, project, and subproject data. Finally, all HTTP requests are displayed in Swagger UI. 

## Installation

First, in order to run TaskMap, you will need to install [GNU Make](https://www.gnu.org/software/make/).
###
Next, run the following commands to get the application up and running. 
```
git clone https://github.com/davidspector67/TaskMap
cd TaskMap
cp sample.env .env
cd backend
make
```

This will start up the backend and database. From here, HTTP requests can be made directly to the API via the command line, or via the Swagger UI representation. This UI can be accessed at the URL: 
`http://localhost:9000/api#/` where `9000` is the port used in your .env file. If you use a different port, adjust the above URL accordingly. 

## Acknowledgements
This application was inspired by a NestJS API developed by [Brandon Shihabi](https://github.com/Bricktheworld) as part of a group project.
