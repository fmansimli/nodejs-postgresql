# Meta Information in Postgres

## >>

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
