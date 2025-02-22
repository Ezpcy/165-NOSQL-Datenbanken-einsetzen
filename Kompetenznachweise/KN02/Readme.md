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

![](image/entitiy.drawio(2).png)

__Abbildung 2: Logisches Datenmodell_

**Plattform**, **Publisher**, und **Technologie** wird in **Spiel** verschachtelt, da sie nur in Verbindung mit einem Spiel relevant sind. Ein Entwickler kann mehrere Spiele entwickeln, daher wird er als eigenständiges Dokument gespeichert.
