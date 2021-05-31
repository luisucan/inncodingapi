# API

[![N|Solid](https://www.inncoding.io/_nuxt/img/fb1c153.png)](https://nodesource.com/products/nsolid)

## Instalación

Instalar dependencias e iniciar el servidor en desarrollo

```sh
cd inncodingapi
npm i
npm run dev
```

Para modo producción...

```sh
npm run prod
```

Para construir el proyecto...

```sh
npm run build
```

## Rutas

##### Registrar nuevo usuario
##
```sh
POST: http://localhost:3000/register
```
Body
```sh
{
    "name":"*",
    "lastname":"*",
    "username":"*",
    "password":"*",
    "email":"",
    "status":"*"
}
```
##### Login
##
```sh
POST: http://localhost:3000/login
```
Body
```sh
{
    "username":"*",
    "password":"*"
}
```
La respuesta regresa un token el cual debe usarse para el consumo ciertos endpoints
```sh
Header -> Authorization: Bearer {token}
```

##### Obtener usuarios
##
```sh
GET: http://localhost:3000/users?pagina=1
```
parametros
```sh
limit: cantidad de registros por pagina (opcional) - default 2
page: el número de la página a consultar           - default 1
```

##### Editar usuario
##
```sh
PUT: http://localhost:3000/users/:id
```
parametro
```sh
id: identificador del usuario
```
Body
```sh
{
    "name": "*",
    "lastname": "*",
    "username": "*",
    "email": "*",
    "status": *
}
```

##### Eliminar usuario
##
```sh
DELETE: http://localhost:3000/users/:id
```
parametro
```sh
id: identificador del usuario
```

## Migración

crear una nueva migración
```sh
ts-node --transpile-only ./node_modules/typeorm/cli.js migration:generate -n mydb
```

ejecutar la migración
```sh
ts-node --transpile-only ./node_modules/typeorm/cli.js migration:run
```
