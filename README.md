# Local Development

### Installation

```
npm i
```

### Environment

Copy the `sample.env` into an `.env` file.

### Starting docker services

```
docker-compose up
```

- client - React app
- api - Api Gateway
- nginx - Serve everything through localhost on local development
- db - Database scripts

### Run migrations

```
docker-compose run --rm api npm run migrate
```

### Run seeder

```
docker-compose run --rm api npm run seed
```
