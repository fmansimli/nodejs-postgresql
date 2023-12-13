# VIEW

## >>

### creating a VIEW

```sql
CREATE VIEW recent_posts AS (
    SELECT title, userId
    FROM posts
    ORDER BY createdAt LIMIT 10
);
```

### creating or replacing a VIEW

```sql
CREATE OR REPLACE VIEW recent_posts AS (
    SELECT title, userId
    FROM posts
    ORDER BY createdAt DESC LIMIT 15
);
```

### dropping a VIEW

```sql
DROP VIEW recent_posts;
```
