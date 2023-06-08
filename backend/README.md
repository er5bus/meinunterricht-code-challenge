## meinunterricht Code Challenge (Backend)

### Prerequisites

- [Docker (at least 1.10)](https://www.docker.com/)
- [Docker-compose (at least 1.6)](https://docs.docker.com/compose/install/)

## Getting Started

To get up and running on local, simply do the following:

```
$ cd backend
```

To create index in elasticsearch db

```
$ make init-db
```

To delete the index in elasticsearch db

```
$ make reset-db
```

To load movies from the api :

```
$ make load-movies 
```

To run the backend :

```
$ make run-server test
```

