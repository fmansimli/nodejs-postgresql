# NodeJS ( TypeScript ) and PostgreSQL

## Database creating and restoring with Docker

mypc >> docker run --name postgres-cont -p 5432:5432 -e POSTGRES_PASSWORD=12345 -d postgres

<br/>

mypc >> docker cp /path/mytestdb.tar postgres-cont:/home/

<br/>

mypc >> docker exec -it postgres-cont bash

<hr/>

container=# psql --username=postgres (--host=localhost --port=5432 --dbname=mytestdb)

<hr/>

postgres=# CREATE DATABASE mytestdb;

<br/>

postgres=# exit

<hr/>

container=# pg_restore --username=postgres --dbname=mytestdb --verbose '/home/mytestdb.tar'

<br/>

container=# rm -rf /home/mytestdb.tar

<br/>

container=# psql --username=postgres

<hr/>

postgres=# \l

<br/>

postgres=# \c mytestdb

<br/>

mytestdb=# \dt (\dt+)

<br/>

mytestdb=# \! clear
