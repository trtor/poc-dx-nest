# Diagnosis PoC Backend

## Docker image MSSQL with fulltext feature

From [GitHub:mssql-docker](https://github.com/Microsoft/mssql-docker/blob/master/linux/preview/examples/mssql-agent-fts-ha-tools/Dockerfile)

## Check FullText feature is installed?

```sql
SELECT
  CASE FULLTEXTSERVICEPROPERTY('IsFullTextInstalled')
    WHEN 1 THEN 'Full-Text installed.'
    ELSE 'Full-Text is NOT installed.'
  END
;
```

## Create FullText search catalog

```sql
CREATE FULLTEXT CATALOG DescriptionFT
```

## Create FullText Index

Copy `PK_xxxxxxxxxxxxxxx` from migration file

```sql
CREATE FULLTEXT INDEX ON dbo.description(term)
KEY INDEX PK_afee2ebe290199c052a015e1fc5 -- PK_xxxxx from migration file
ON DescriptionFT
WITH CHANGE_TRACKING AUTO
```

## Search example

```sql
SELECT
  Rank as rank,
  d.conceptId,
  d.term
FROM
  description AS d
  INNER JOIN CONTAINSTABLE
    ( description, term,
      '"(disorder)" AND "fracture*" AND "leg*"'
    )
    AS KEY_TBL ON t.pid = KEY_TBL.[KEY]
WHERE
  d.active = 1
  AND term LIKE '%(disorder)'
  AND term NOT like '[[]X]%'
```

## Issue

- SQL injection prevention
