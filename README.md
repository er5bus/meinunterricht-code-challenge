# meinunterricht Code Challenge
Build a system that pulls data from the movies API (omdbapi.com), stores that data in
your system’s local database, and makes it searchable.
1. Use NodeJS to build the backend
2. Limit the data you pull to movies from the year 2001 that contain the word “space” in their title
3. Use a database of your choice as the primary data store
4. [Optional] Create the search backend using a search engine (e.g. ElasticSearch)
5. Use any front-end technology to build the frontend
6. Provide a search functionality to the user
a. search-term can appear in the title, director or plot of the movie
b. Movie-results should be shown with poster, title, director, and plot
7. Add sufficient test coverage to your system
8. Set up the backend in a dockerized environment

Note: The focus of this challenge is API and system design, and the quality of your code. You don’t have to make a perfect-looking UI.

# Submission
Submit your code using a git repository and send us the link or a git bundle.
The Submission needs to contain a README.md file that describes the following:
● How to start the project. Preference for a docker-compose setup that allows bootstrapping the whole environment without too much friction.
● Your architecture design decisions

### Prerequisites

- [Docker (at least 1.10)](https://www.docker.com/)
- [Docker-compose (at least 1.6)](https://docs.docker.com/compose/install/)

## Getting Started

To get up and running on local, simply do the following:

```
$ cd meinunterricht-code-challenge
$ make run-demo
```

OR 

```
$ cd meinunterricht-code-challenge
$ cp .env.example .env
$ docker-compose run --rm app npm run elasticsearch create-db-index
$ docker-compose run --rm app npm run load movies-data
$ docker-compose up
```

# Architecture design decisions

1. **Backend Architecture**: I follow modular structure where different parts of the application are organized into separate directories, making it easier to understand, maintain, and extend the code.
2. **Database Choice**: I used Elasticsearch as the database and integrated it into the application, but it can be easily replaced with another database system by implementing the necessary repository and data access code.
3. **Data Providers**: I implemented the `movies.dataProvider.js` file, which serves as the data provider responsible for fetching movie data from the OMDB API. This encapsulates the logic for retrieving movie data from external sources and ensures separation of concerns.
4. **Services**: I created the `movies.service.js` file, which houses the core business logic of the application related to movies. This service orchestrate the interaction between data providers and repositories.
5. **Repositories**: In the `database/repositories` directory, I implemented the `movie.repository.js` file, which acts as an abstraction over database operations for movies. This repository encapsulates the data access layer and provides a clean interface for interacting with the database.
6. **API Routes**: The API routes are defined in the `api` directory, specifically in the `movies.route.js` file. These routes handle incoming requests and invoke the corresponding service methods.
7. **Error Handling**: I implemented a custom error class and an error handling middleware to ensure consistent error handling throughout the application. This helps in proper error reporting and ensures that errors are handled gracefully. The `customError.js` and `handleErrors.js` files in the `helpers` directory are responsible for this functionality.
8. **Testing**: I included a separate `tests` directory, which contains unit tests to ensure the correctness of individual components, services, and functions. These tests validate the expected behavior of different parts of the codebase, improving code quality and providing confidence in the system's behavior.
9. **Dockerization**: The provided Docker Compose files and Dockerfiles allow for easy setup and deployment of the backend in a containerized environment.
10. **Make file**: The Makefiles provide a set of predefined commands and targets, allowing for efficient management of dependencies and ensuring consistency across different environments.


I aimed to create a clean, maintainable codebase that demonstrates separation of concerns, reusability, and flexibility in tackling the challenge.
