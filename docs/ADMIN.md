# ADMIN

## >>

### showing Data directory

```sql
SHOW data_directory;
```

### showing which folder each database files get stored in

```sql
SELECT oid, datname from pg_database;
```

### showing which file each object (tables,indexes etc) get stored inside data_directory

```sql
SELECT * FROM pg_class;
```

### showing existing INDEXES

```sql
SELECT relname, relkind from pg_class WHERE relkind='i';
```

### showing relation-size

```sql
SELECT pg_size_pretty(pg_relation_size('users'));
```

### showing ???? size

````sql
SELECT pg_size_pretty(pg_relation_size('posts_pkey'));```
````
