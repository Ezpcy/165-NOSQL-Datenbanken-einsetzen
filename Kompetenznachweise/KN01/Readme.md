# KN-M-01: Installation und Verwaltung von MongoDB

## Cloud-init Datei

```yaml
#cloud-config
users:
  - name: ubuntu
    sudo: ALL=(ALL) NOPASSWD:ALL
    groups: users, admin
    home: /home/ubuntu
    shell: /bin/bash
    ssh_authorized_keys:
      - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCPIIO8uY8oWIihDv0tCAbX6toyG1RYkaLZyfGD1L+I07K4CnwAVBSU+81vw3Yv5sN9tj2Ccve9kzEeCNMld2mDP/Tt7edkx2MCToVfVx+njqwY/XbMY9bfdRKJLhIoLavuVNLnnkSIXdtlGr3JF71hPHzBDMEo64ofPCQ8hPsGxL1u3efb12jcWcRhudKtv7Qh6cVE47Zj4xImfi6VlLqwzcKZ5oCqR/z1hLLL+/pS3eM5Qsor5wmAqNfH4+z5eE+pOkFm7a0Nkygv9jwXIqtJzFGKYDe6ciBD04pEovdvY0FTyiv2vksQOVgjtu2faG2Iv1HOG0JktCIwJ49OEgjT teacher-key
      - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC6QJ10ER5R3uS33RzwxZzxIg6iueaUr6rXVbtrinNgcMxn8fZynYj7bagx6VQThaijljr2jrC5D6X7NN70Aiglz3LbQmZy5PaeR8EgW7N9T6Mn3rP/1Or19nvmPtu/IH7q5C/f/uvZdA1de8UOo0muVADAqEsPzxBEYJYdGSVtXoqDvQMc5AelEO27no9fKbd/H6xeG9mCcYrrqI0ODtCPsY9sfTL+G8kRQunx58DGNz2b4JFShmc50t3h0kQUv/HXlx/2rCRo00gr9eHCV5vpGeorDSINlukaHyNtpKAZtTYsPZZy2Bj3LGmx8M0oodVjJ/q7e1h91woW7fKmpLxD aws-key
ssh_pwauth: false
disable_root: false
package_update: true
packages:
  - unzip
  - gnupg
  - curl
write_files:
  - path: /home/ubuntu/mongodconfupdate.sh
    content: |
      sudo sed -i 's/#security:/security:\n  authorization: enabled/g' /etc/mongod.conf
  - path: /home/ubuntu/mongodbuser.txt
    content: |
      use admin;
      db.createUser(
        {
          user: "admin",
          pwd: "",
          roles: [
            { role: "userAdminAnyDatabase", db: "admin" },
            { role: "readWriteAnyDatabase", db: "admin" }
          ]
        }
      );

runcmd:
  - curl -fsSL https://pgp.mongodb.com/server-6.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg --dearmor
  - echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
  - sudo apt-get update -y
  - sudo apt-get install -y mongodb-org
  - sudo sed -i 's/127.0.0.1/0.0.0.0/g' /etc/mongod.conf
  - sudo chmod +x /home/ubuntu/mongodconfupdate.sh
  - sudo /home/ubuntu/mongodconfupdate.sh
  - sudo systemctl enable mongod
  - sudo systemctl start mongod
  - sudo sleep 3
  - sudo mongosh < /home/ubuntu/mongodbuser.txt
  - sudo systemctl restart mongod
```

![](image/Pasted%20image%2020250221161215.png)

_Abbildung 1: Docker Compass_

## Connection String

- `mongodb://admin:*****@100.25.106.212:27017/?authSource=admin&readPreference=primary&ssl=false`
	- `authSource=admin` gibt an, dass die Authentifizierung in der Datenbank `admin` stattfindet. Dies ist korrekt, da der Benutzer `admin` in der Datenbank `admin` erstellt wurde.

## Erklärung der Cloud-init Datei

- `sudo sed -i 's/127.0.0.1/0.0.0.0/g' /etc/mongod.conf`
	- Der Befehl ersetzt in der Datei `/etc/mongod.conf` alle Vorkommen von `127.0.0.1` durch `0.0.0.0`. Dies ist notwendig, damit MongoDB auch von anderen Rechnern im Netzwerk erreicht werden kann.
 - `sudo sed -i 's/#security:/security:\n  authorization: enabled/g' /etc/mongod.conf`
	 - Der Befehl fügt in der Datei `/etc/mongod.conf` nach dem Kommentar `#security:` die Zeile `security:\n  authorization: enabled` ein. Dies ist notwendig, damit die Authentifizierung in MongoDB aktiviert wird.

![](image/Pasted%20image%2020250221162216.png)

_Abbildung 2: Inhalt der MongoDB Konfigurations-Datei_

## MongoDB Compass

Einfügen von Daten:

![](image/Pasted%20image%2020250221175107.png)

_Abbildung 3: Einfügen von Daten_

Export JSON:

```json
[{
  "_id": {
    "$oid": "67b89a8a630fcba31e280050"
  },
  "name": "Batuhan Seker",
  "birthday": {
    "$date": "1995-02-17T23:00:00.000Z"
  },
  "adress": "Buhaldenstrasse 8e",
  "note": 6
}]
```

- Um ein Datum in MongoDB zu speichern, wird es als Objekt mit dem Schlüssel `$date` und dem Wert als ISO-8601-Datum (z. B. `1995-02-17T23:00:00.000Z`) gespeichert. Dies ist notwendig, da MongoDB keine speziellen Datentypen für Datum und Zeit hat, sondern alle Daten als JSON-Objekte speichert.

Shell Interaktion:

![](image/Pasted%20image%2020250221175505.png)

_Abbildung 4: Shell Interaktion_

1. `show dbs` zeigt alle Datenbanken an.
2. `show databases` zeigt alle Datenbanken an.
3. `use Seker` wechselt zur Datenbank `Seker`.
4. `show collections` zeigt alle Collections in der Datenbank `Seker` an.
5. `show tables` zeigt alle Collections in der Datenbank `Seker` an.

Unterschied zwischen Collections und Tables:

| Collections | Tables |
| ----------- | ------ |
| Enthält **Dokumente** | Enthält **Zeilen (Rows) mit Spalten (Columns)** |
| Flexibles Schema | Statisches Schema |
| Dokumente können unterschiedliche Felder haben | Jede Zeile hat die gleichen Spalten |
| Keine Relationen | Beziehungen können definiert werden |


![](image/Pasted%20image%2020250222172220.png)

_Abbildung 5: SSH mongo shell_

