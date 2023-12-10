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

<br/>
<br/>

### getting meta information about the database

```sql
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'mydatabase' AND pid <> pg_backend_pid();
```

### selecting information of tables

```sql
SELECT * FROM information_schema.tables
WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
```

### looking at definition of a table

```sql
SELECT column_name, data_type, character_maximum_length, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'authors';
```
