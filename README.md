# backoffice-backend

## Development

### Setup local database using Docker

```
docker-compose up -d
```

### Install dependencies using NPM

```bash
npm install
```

### Run database migrations

```bash
npm run typeorm migration:run
```

### Documentation

Go to http://localhost:3000/swagger

## Deploy

```bash
serverless deploy --stage local
```
