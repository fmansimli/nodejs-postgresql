# Restoring

## Database creating and restoring with Docker

```bash
mypc>> docker run --name postgres-cont -p 5432:5432 -e POSTGRES_PASSWORD=12345 -d postgres
```

```bash
mypc>> docker cp /path/mytestdb.tar postgres-cont:/home/
```

```bash
mypc>> docker exec -it postgres-cont bash
```

### >> on container

```bash
container=# psql --username=postgres (--host=localhost --port=5432 --dbname=mytestdb)
```

```bash
postgres=# CREATE DATABASE mytestdb;
```

```bash
postgres=# exit
```

```bash
container=# pg_restore --username=postgres --dbname=mytestdb --verbose '/home/mytestdb.tar'
```

```bash
container=# rm -rf /home/mytestdb.tar
```

```bash
container=# psql --username=postgres
```

### >> on psql shell

```bash
postgres=# \l
```

```bash
postgres=# \c mytestdb
```

```bash
mytestdb=# \dt (\dt+)
```

```bash
mytestdb=# \! clear
```
