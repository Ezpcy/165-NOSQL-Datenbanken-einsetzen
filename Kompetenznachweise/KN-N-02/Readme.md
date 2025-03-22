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

Ohne `detach delete`:

![](image/Pasted%20image%2020250322153535.png)

_Abbildung 1: Löschen ohne `detach delete`_

Mit  `detach delete`:

![](image/Pasted%20image%2020250322153600.png)

_Abbildung 2: Löschen mit `detach delete`_

Falls ein Knoten Beziehungen zu anderen Knoten hat, lässt dich dieser ohne `detach delete` nicht löschen. Mit `detach delete` werden auch die Beziehungen gelöscht.

## D) Daten verändern

### Szenario 1: Beförderung eines Entwicklers zum Lead-Developer

Sarah Schmidt war bisher nur eine Entwicklerin für das Spiel "Rayman 3". Nun wird sie zum Lead-Developer befördert. Das bedeutet:
- Die Beziehung `DEVELOPS` zwischen Sarah und "Rayman 3" bleibt bestehen.
- Es wird eine neue Beziehung `IS_LEAD_DEV` zwischen Sarah und "Rayman 3" erstellt.

```cypher
MATCH (dev:Entwickler {firstname: 'Sarah', lastname: 'Schmidt'})-[:DEVELOPS]->(game:Spiel {title: 'Rayman 3'})
MERGE (dev)-[:IS_LEAD_DEV]->(game)
RETURN dev, game;
```

![](image/Pasted%20image%2020250322154813.png)

_Abbildung 3: Beförderung von Sarah Schmidt zum Lead-Developer_

### Szenario 2: Aktualisierung der Technologie eines Spiels

"Assassins Creed: Remastered" wurde ursprünglich mit der **Unreal Engine 5.2** entwickelt. Aufgrund technischer Verbeserungen wird die Technologie auf **Unreal Engine 5.3** aktualisiert. Das bedeutet:
- Die aktuelle `HAS_TECHNOLOGIE`-Beziehung zwischen "Assassins Creed: Remastered" und **Unreal Engine 5.2** wird gelöscht.
- Es wird eine neue `HAS_TECHNOLOGIE`-Beziehung zwischen "Assassins Creed: Remastered" und **Unreal Engine 5.3** erstellt.

```cypher
MATCH (game:Spiel {title: 'Assassins Creed: Remastered'})-[rel:HAS_TECHNOLOGIE]->(tech:Technologie {title: 'Unreal Engine'})
DELETE rel
MERGE (newTech:Technologie {title: 'Unreal Engine', version: 5.3, sprache: 'C++'})
MERGE (game)-[:HAS_TECHNOLOGIE]->(newTech)
RETURN game, newTech;
```

![](image/Pasted%20image%2020250322154746.png)

_Abbildung 4: Technologie-Update für "Assassins Creed: Remastered"_

### Szenario 3: Fusion zweier Publisher

Ubisoft übernimmt den Publisher CryTek. Das bedeutet:
- Alle Spiele von CryTek werden unter Ubisoft veröffentlicht.
- Der Publisher-Knoten von CryTek wird gelöscht.

```cypher
MATCH (oldPub:Publisher {title: 'CryTek'})<-[:HAS_PUBLISHER]-(game:Spiel)
MATCH (newPub:Publisher {title: 'Ubisoft'})
MERGE (game)-[:HAS_PUBLISHER]->(newPub)
WITH oldPub
DETACH DELETE oldPub
RETURN 'Success';
```

![](image/Pasted%20image%2020250322154955.png)

_Abbildung 5: Fusion von CryTek und Ubisoft_

## E) Zusätzliche Klauseln

### 1. Klausel: `MERGE`

`MERGE`wird verwendet um **Knoten oder Beziehungen nur dann zu erstellen, wenn sie noch nicht existieren**. Falls sie bereits existieren, wird nichts verändert.

**Anwendungsfall:**
Wir möchten sicherstellen, dass ein Spiel **"Cyberpunk 2077"** mit dem Publisher **"CD Projekt"** existiert. Falls das Spiel oder Publisher noch nicht existieren, werden sie erstellt.

```cypher
MERGE (game:Spiel {title: 'Cyberpunk 2077', releaseDate: date('2020-12-10'), genres: ['RPG', 'Action']})
MERGE (pub:Publisher {title: 'CD Projekt', website: 'www.cdprojekt.com', tel: '123123123', email: 'contact@cdprojekt.com'})
MERGE (game)-[:HAS_PUBLISHER]->(pub)
RETURN game, pub;
```

Vorteil von `MERGE`:
- Es verhindert Duplikate.
- Falls das Spiel oder der Publisher bereits existiert, wird nur die fehlende Beziehung erstellt.

### 2. Klausel: `UNWIND`

`UNWIND` wird verwendet, um **eine Liste von Werten in einzelne Zeilen zu "entpacken"**. Dadurch können Elemente einer Liste nacheinander verarbeitet werden.

**Anwendungsfall:**
Ein neuer Entwickler `Lukas Meier` wurde eingestellt. Er soll gleich an mehreren Spielen arbeiten: **"Crysis4", "Rayman 3", und "Cyberpunk 2077"**. Anstatt für jedes Spiel eine separate Query zu schreiben, können wir `UNWIND` verwenden.

```cypher
MATCH (dev:Entwickler {firstname: 'Lukas', lastname: 'Meier'})
WITH dev, ['Crysis 4', 'Rayman 3', 'Cyberpunk 2077'] AS spiele
UNWIND spiele AS spielTitel
MATCH (game:Spiel {title: spielTitel})
MERGE (dev)-[:DEVELOPS]->(game)
RETURN dev, game;
```

Vorteil von `UNWIND`:
- Reduziert den Schreibaufwand.
- Ermöglicht die Verarbeitung von Listen in einer einzigen Query.

