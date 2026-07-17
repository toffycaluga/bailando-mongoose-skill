# Bailando con Mongoose

Proyecto backend desarrollado con Node.js, Express, MongoDB y Mongoose para practicar la creación de una API REST con operaciones CRUD.

La aplicación permite registrar, consultar, actualizar y eliminar canciones almacenadas en MongoDB.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- dotenv
- CORS
- Nodemon
- Postman

## Funcionalidades

- Crear canciones.
- Obtener todas las canciones.
- Obtener una canción por su ID.
- Actualizar canciones existentes.
- Eliminar canciones.
- Validar los datos con Mongoose.
- Manejar IDs inválidos y canciones inexistentes.
- Generar fechas de creación y actualización automáticamente.

## Modelo de canción

Cada canción contiene los siguientes campos:

- `titulo`: requerido, entre 6 y 255 caracteres.
- `artista`: requerido, entre 10 y 255 caracteres.
- `anioLanzamiento`: requerido y de cuatro dígitos.
- `genero`: requerido.
- `createdAt`: generado automáticamente.
- `updatedAt`: generado automáticamente.

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
MONGODB_URI=tu_cadena_de_conexion_de_mongodb
````

El archivo `.env` no debe subirse al repositorio.

## Scripts disponibles

Iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

Iniciar el servidor normalmente:

```bash
npm start
```

## Endpoints

| Método | Ruta             | Descripción                 |
| ------ | ---------------- | --------------------------- |
| POST   | `/canciones`     | Crear una canción           |
| GET    | `/canciones`     | Obtener todas las canciones |
| GET    | `/canciones/:id` | Obtener una canción por ID  |
| PUT    | `/canciones/:id` | Actualizar una canción      |
| DELETE | `/canciones/:id` | Eliminar una canción        |

## Ejemplo de canción

```json
{
  "titulo": "Bohemian Rhapsody",
  "artista": "Queen Official",
  "anioLanzamiento": 1975,
  "genero": "Rock"
}
```

## Validaciones

El modelo comprueba que:

* Los campos obligatorios estén presentes.
* El título tenga entre 6 y 255 caracteres.
* El artista tenga entre 10 y 255 caracteres.
* El año de lanzamiento tenga cuatro dígitos.
* Los textos no almacenen espacios innecesarios.

Las validaciones también se ejecutan al actualizar una canción mediante `runValidators: true`.

## Pruebas manuales

Los endpoints fueron probados con Postman, incluyendo:

* Creación de canciones.
* Consulta de todas las canciones.
* Consulta por ID.
* Actualización de canciones.
* Eliminación de canciones.
* Campos obligatorios ausentes.
* Títulos y artistas demasiado cortos.
* Años inválidos.
* IDs con formato incorrecto.
* Canciones inexistentes.

⌨️ con ❤️ por [Abraham Lillo](https://github.com/toffycaluga)

