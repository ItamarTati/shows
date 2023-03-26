# shows

Shows is the backend for the Anime Picker Client web application built with React.js. It provides RESTful API endpoints to allow users to browse, search, and filter through a collection of anime shows stored in a database.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation and Usage

```
npm install
npm start
```

Make sure to set up your environment variables for the database connection

## API Endpoints

The server provides the following RESTful API endpoints:

- GET /api/shows: Get a list of anime shows with optional filters, search, sort, pagination Query Parameters:
-- genre: Filter by genre (multiple values allowed, comma-separated)
-- search: Search by show name or description
-- sort: Sort by a field (default: title, options: title, numberOfEpisodes, mangaChapters, animeReleaseDate)
-- order: Sort order (default: asc, options: asc, desc)
-- limit: Maximum number of shows per page (default: 4)
-- page: Page number (default: 1)
- GET /api/shows/:id: Get an anime show by ID


## Contributing

Contributions are welcome! Please create a pull request or an issue if you find any bugs or have any feature requests.

## License

This project is licensed under the MIT License.
