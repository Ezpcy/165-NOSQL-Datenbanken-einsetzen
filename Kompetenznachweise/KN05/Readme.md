# KN05: Administration von MongoDB

## A) Rechte und Rollen

![Failed Login](image/auth.png)

_Abbildung 1: Fehlgeschlagener Loginversuch_

**Skript zum erstellen der User:**

![Create User](createUsers.js)

**Benutzer 1: Login und Interaktion:**

![Benutzer 1](image/reader_shell.png)

_Abbildung 2: Benutzer 1 Shell_

**Benutzer 2: Login und Interaktion:**

![Benutzer 2](image/reader_writer_shell.png)

_Abbildung 3: Benutzer 2 Shell_

## B) Backup und Restore

### Variante 1: Snapshot

**Erstellung des Snapshots:**

![Snapshot](image/snapshot.png)

_Abbildung 4: Snapshot_

**Löschung einer Collection:**

![Before Deletion](image/before_deletion.png)

_Abbildung 5: Vor der Löschung_

![After Deletion](image/after_deletion.png)

_Abbildung 6: Nach der Löschung_

**Wiederherstellung des Snapshots:**

![Volume Creation](image/volume_creation.png)

_Abbildung 7: Volume Creation_

**Detach des Volumes:**

![Detach Volume](image/detach_volume.png)

_Abbildung 8: Detach Volume_

**Attach des Volumes:**

![Attach Volume](image/attaching_volume.png)

_Abbildung 8: Attach Volume_

**Ergebnis:**

![After Restore](image/collection_after.png)

_Abbildung 9: Nach der Wiederherstellung_

### Variante 2: `mongodump`

**DB vor dem Löschen:**

![alt text](image/v2_collection_before.png)

_Abbildung 10: Collection vor dem Löschen_

**Erstellung des Dumps:**

![dump](image/v2_dump.png)

**DB nach dem löschen:**

![drop](image/v2_drop.png)

_Abbildung 11: Collection nach dem Löschen_

![drop gui](image/v2_drop_gui.png)

_Abbildung 12: Collection nach dem Löschen (GUI)_

**Wiederherstellung des Dumps:**

![restore](image/v2_mongorestore.png)

_Abbildung 13: Wiederherstellung des Dumps_

**Ergebnis:**

![restore gui](image/v2_gui.png)

_Abbildung 14: Wiederherstellung des Dumps (GUI)_

## C) Skalierung

### Unterschied zwischen Replication und Partitioning

### Replication

**Replication** erstellt Kopien einer Datenbank oder einer Datenbank `node`. Jede `node` in einem Cluster erhält eine Kopie der Datenbank. Falls eine `node` ausfällt, kann eine andere `node` die Arbeit übernehmen. Es ist also eine Form von `scaling` und `fault tolerance`. Die Anfragen werden an die `nodes` verteilt. Während `Read Requests` verteilt werden, während `Write Requests` nur and die `Primary Node` gehen und diese dann an die `Secondary Nodes` weiterleitet.

![Replication](image/replication.png)

_Abbildung 15: Replication; Quelle: [MongoDB](https://www.mongodb.com/resources/basics/scaling)_

### Partitioning aka Sharding

**Partitioning** teilt die Datenbank in kleinere Teile auf. Jeder Teil wird auf einer anderen `node` gespeichert. Es ist also eine Form von `scaling`. Jedes `Replica Set` in einem Cluster speichert einen Teil der Daten, basierend auf einem `Shard Key`, welche evaluiert welche Daten auf welcher `node` gespeichert werden. Es ermöglicht die horizontale Skalierung von Datenbanken, virtuell ohne Limit. Weil jede `node` nur für einen Teil der Daten verantwortlich ist, wird die allgemeine Kapazität für `Read` und `Write` Anfragen erhöht.

![Sharding](image/partitioning.png)

_Abbildung 16: Sharding; Quelle: [MongoDB](https://www.mongodb.com/resources/basics/scaling)_

Die Komplexität von `Sharding` ist höher als bei `Replication`. Weil jede `node` nur einen Teil der Daten speicher, müssen die Anfragen an die richtige `node` gesendet werden. Dies wird durch den `mongos` Prozess erledigt, welcher die Anfragen an die richtige `node` weiterleitet.

Wenn die Daten gleichmässig auf die `nodes` verteilt wird, können `reads` und `writes` parallel ausgeführt werden. Dies erhöht die Performance.

Nach allem was Sie nun wissen, machen Sie eine Empfehlung an Ihre Firma. Gehen Sie davon aus, dass eine der Applikationen Ihrer Firma MongoDB verwendet. Erklären Sie die Situation (textuell) und geben dann eine Empfehlung ab wie die Applikation weitergeführt werden soll. Ein Status Quo ist erlaubt als Empfehlung, muss aber begründet werden

### Empfehlung

Die Firma sollte `Sharding` verwenden, wenn die Datenbank zu gross wird. `Sharding` erlaubt die horizontale Skalierung der Datenbank, was bedeutet, dass die Datenbank auf mehrere `nodes` verteilt wird. Dies erhöht die Performance, weil `reads` und `writes` parallel ausgeführt werden können. Die Datenbank kann virtuell ohne Limit skaliert werden. Die Komplexität von `Sharding` ist höher als bei `Replication`, aber die Performance Vorteile sind es wert.
