	# KN-N-02: Datenabfrage und -Manipulation 

## A) Daten hinzufügen 

**Skript Datei:**

![](createSpielDb.cypher)

## B) Daten abfragen

### Alle Knoten und Kanten anzeigen

Um alle Knoten und Kanten zu sehen, kann folgende Query verwendet werden:

```cypher
MATCH (n)-[r]->(m) RETURN n,r,m
```

**Erklärung:**
- `MATCH`: Findet alle Knoten und Kanten, die den Bedingungen entsprechen.
- `(n)-[r]->(m)`: Definiert ein Muster, das einen Knoten `n` mit einer Kante `r` zu einem anderen Knoten `m` verbindet.
- `RETURN n,r,m`: Gibt alle gefundenen Knoten und Kanten zurück.

### Optional

Falls wir auch isolierte Knoten (ohne Beziehungen) sehen wollen, verwenden wir die **`OPTIONAL MATCH`**-Klausel:

```cypher
MATCH (n)
OPTIONAL MATCH (n)-[r]->(m)
RETURN n, r, m;
```

**Erklärung:**
- `OPTIONAL MATCH`: Findet alle Knoten, auch wenn keine Kanten vorhanden sind.
- `(n)`: Definiert einen isolierten Knoten.
- `RETURN n, r, m`: Gibt alle gefundenen Knoten und Kanten zurück.

### 4 Szenarien

#### Szenario 1: Entwickler mit Erfahrung > 5 und ihre entwickelten Spiele

```cypher
MATCH (dev:Entwickler)-[:DEVELOPS]->(game:Spiel)
WHERE dev.experience > 4
RETURN dev.firstname, dev.lastname, dev.experience, game.title;
```

#### Szenario 2: Plattformen und ihre Spiele, inklusive Plattformen ohne Spiele

```cypher
MATCH (platform:Plattform)
OPTIONAL MATCH (platform)-[:HAS_SPIEL]->(game:Spiel)
RETURN platform.title, game.title;
```

#### Szenario 3: Spiele die von bestimmten Entwicklern entwickelt wurden, aber nur bei einem bestimmten Genre

```cypher
MATCH (dev:Entwickler)-[:DEVELOPS]->(game:Spiel)
WHERE 'RPG' IN game.genres
RETURN dev.firstname, dev.lastname, game.title, game.genres;
```

#### Szenario 4: Spiele und Technologien unter Version 5

```cypher
MATCH (game:Spiel)-[:HAS_TECHNOLOGIE]_>(tech:Technologie)
WHERE tech.version < 5
RETURN game.title, tech.title
```

## C) Daten löschen

## D) Daten verändern

## E) Zusätzliche Klauseln