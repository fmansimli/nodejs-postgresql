# NodeJS ( TypeScript ) and PostgreSQL

## Database creating and restoring with Docker

#### mypc >> docker run --name postgresCont -p 5432:5432 -e POSTGRES_PASSWORD=12345 -d postgres

#### mypc >> docker cp /path/mytestDb.tar postgresCont:/home/mytestDb.tar

#### mypc >> docker exec -it postgresCont bash

<hr/>

#### container=# psql --username=postgres (--host=localhost --port=5432 --dbname=mytestDb)

<hr/>

#### postgres=# CREATE DATABASE mytestDb;

#### postgres=# exit

<hr/>

#### container=# pg_restore --username=postgres --dbname=mytestDb --verbose '/home/mytestDb.tar'

#### container=# rm -rf /home/mytestDb.tar

#### container=# psql --username=postgres

<hr/>

#### postgres=# \l

#### postgres=# \c mytestDb

#### mytestDb=# \dt (\dt+)

#### mytestDb=# \! clear
