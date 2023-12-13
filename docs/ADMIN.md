# ADMIN

## >>

### showing Data directory (bash)

```bash
SHOW data_directory;
```

### ??????

```sql
SELECT oid, datname from pg_database;
```

### ?????

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
