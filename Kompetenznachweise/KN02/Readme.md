# KN02: Datenmodellierung für MongoDB

## A) Konzeptionelles Datenmodell

Erstellt wird ein Schema für ein Spiele Studio, welches Spiele, Entwickler, Plattformen, Technologien und Publisher verwaltet.

![](image/Untitled%20Diagram.drawio(2).png)

_Abbildung 1: Konzeptionelles Datenmodell_


- **Spiel zu Entwickler**: n..n
- **Publisher zu Spiel**: 0..n
- **Plattform zu Spiel**: 1.n
- **Technologie zu Spiel**: 1.n

## B) Logisches Modell für MongoDB


![](../../../../../../entitiy.drawio(3).png)

_Abbildung 2: Logisches Datenmodell_

**Plattform**, **Publisher**, und **Technologie** wird in **Spiel** verschachtelt, da sie nur in Verbindung mit einem Spiel relevant sind. Ein Entwickler kann mehrere Spiele entwickeln, daher wird er als eigenständiges Dokument gespeichert. Die Verschachtelung vereinfacht das Abfragen, da alle relevanten Informationen in einem Dokument gespeichert sind.

Möchte ich wissen welche Entwickler an einem Spiel arbeiten, kann ich den Array der Entwickler in einem Spiel Dokument abfragen.

```json
db.Spiel.find({Name: "Cyberpunk 2077"}, {Entwickler: 1})
```

Entwickle ich ein Spiel und möchte Entwickler finden die mehr als 5 Jahre Erfahrung haben, kann ich dies mit folgender Query machen:

```json
db.Entwickler.find({Erfahrung: {$gt: 5}})
```

Bei den **Technologien** lohnt sich die Verschachtelung, da gleiche Technologien verschiedene Versionen haben können. So kann ich in einem Dokument alle Versionen einer Technologie speichern.

Möchte ich nur Kontakt Daten der Publisher von einem Spiel, kann ich auch nur diese Abfragen antstellen.

```json
db.Spiel.find( { Name: "Cyberpunk 2077" }, { "Publisher.Kontakt": 1, _id: 0 } )
```

**Vorteile:**
- Da die meisten Daten bereits in einem Dokument gespeichert sind, sind weniger Abfragen notwendig.
- **Plattformen**, **Technologien** und **Entwickler** können variieren, ohne dass das Schema stark angepasst werden muss.
**Nachteile:**
- Bei allen eingebettet können sich Daten wiederholen, was zu Redundanz führen kann.
- Falls ein Entwickler in mehreren Spielen arbeitet, muss der Entwickler in jedem Spiel Dokument aktualisiert werden.

**Use-Cases:**
- **Plattformen**: Welche Plattformen sind für ein Spiel verfügbar?
- **Publisher**: Wer hat ein Spiel veröffentlicht?
- **Technologien**: Welche Technologien wurden für ein Spiel verwendet?
- **Entwickler**: Welche Entwickler haben an einem Spiel gearbeitet?
