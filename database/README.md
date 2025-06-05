# SongRec Database

This is the PostgreSQL database service for the SongRec project.  
It stores user accounts, search history, and any other persistent data for the backend.

## Setup

- The database is run as a Docker container using the official `postgres:15` image.
- Data is persisted in the `./database/data` folder (on your host machine).

## Usage

The database is started automatically with Docker Compose:

`docker-compose up`

Your data will be stored in `./database/data` so it won't be lost if you restart the container.

## Connecting

You can connect to the database using:

- **psql** (CLI)

  `docker-compose exec db psql -U songrec -d songrecdb`

- **GUI tools** like [pgAdmin](https://www.pgadmin.org/), [DBeaver](https://dbeaver.io/), or [TablePlus](https://tableplus.com/)

Connection settings:

- Host: `localhost`
- Port: `5432`
- User: `songrec`
- Password: `songrecpass`
- Database: `songrecdb`

## Notes

- The database schema (tables) is managed by the backend (via SQLAlchemy/Alembic).
- If you change the user/password/db name, update both `docker-compose.yml` and your backend config.
- For development, you can safely remove `./database/data` to reset the DB (but you'll lose all data).

---

_If you have trouble connecting, check that the container is running and the port isn't blocked by another process._
