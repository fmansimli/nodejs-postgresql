# ANALYTICS

## >>

### ??????

```sql
SELECT booking_date, amount_tipped, SUM(amount_tipped) OVER ()
FROM bookings;
```

### ????????

```sql
SELECT booking_date, amount_tipped, SUM(amount_tipped) OVER (PARTITION BY booking_date)
FROM bookings;
```

### ???????

```sql
SELECT booking_date, amount_tipped, SUM(amount_tipped) OVER (PARTITION BY booking_date ORDER BY amount_billed ASC)
FROM bookings;
```
