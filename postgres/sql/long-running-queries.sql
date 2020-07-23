SELECT EXTRACT(EPOCH FROM now() - query_start) AS seconds, query, state
FROM  pg_stat_activity 
WHERE now() - query_start > interval '1 seconds' AND query NOT LIKE '%pg_stat_activity%'
ORDER BY seconds DESC LIMIT 20;