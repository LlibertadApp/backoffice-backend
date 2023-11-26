# INFO

**Español:** Este proyecto y/o repositorio, al igual que todos los demás, está liberado bajo la licencia AGPL. Para más información, visita este enlace: [README](https://github.com/LlibertadApp/.github/blob/main/profile/README.md).

**English** This project and/or repository, like all others, is released under the AGPL license. For more information, please visit this link: [README](https://github.com/LlibertadApp/.github/blob/main/profile/README.md).



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
