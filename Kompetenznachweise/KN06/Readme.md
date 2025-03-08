# KN06: JSON Schema und Collection Validierung

## A) JSON Schemas erstellen

**Schema für `Entwickler` Collection:**

![Entwickler Schema](entwicklerSchema.json)

**Schema für `Spiel` Collection:**

![Spiel Schema](spielSchema.json)

## B) Validierung hinterlegen und testen

### Setup für `Entwickler` Collection

**Validations Regeln für `Entwickler`:**

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["name", "email", "rolle"],
    "properties": {
      "_id": {
        "bsonType": "objectId",
        "required": ["_id"]
      },
      "name": {
        "bsonType": "string",
        "description": "Der Name als String."
      },
      "email": {
        "bsonType": "string",
        "description": "Die Email-Adresse als String."
      },
      "rolle": {
        "bsonType": "string",
        "description": "Die Rolle als String."
      },
      "erfahrung": {
        "bsonType": "int",
        "description": "Die Erfahrung in Jahren (Ganzzahl).",
        "minimum": 0
      },
      "spiele": {
        "bsonType": "array",
        "description": "Liste der referenzierten Spiele.",
        "items": {
          "bsonType": "object",
          "required": ["_id"],
          "properties": {
            "_id": {
              "bsonType": "objectId",
              "description": "Referenzierte Spiel-ID als ObjectId."
            }
          }
        }
      }
    },
    "additionalProperties": false
  }
}
```

**Ergebnisse:**

Fehlgeschlagene Validierung:
![](image/Pasted%20image%2020250308181401.png)

_Abbildung 1: Fehlgeschlagene Validierung_

Erfolgreiche Validierung:
![](image/Pasted%20image%2020250308183614.png)

_Abbildung 2: Erfolgreiche Validierung_

### Setup für `Spiel` Collection

**Schema für `Spiel` Collection:**

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "title": "Spiel",
    "required": ["_id", "name", "genres"],
    "properties": {
      "_id": {
        "bsonType": "objectId",
        "title": "The _id Schema",
        "required": ["_id"]
      },
      "name": {
        "bsonType": "string",
        "title": "The name Schema"
      },
      "genres": {
        "bsonType": "array",
        "title": "The genres Schema",
        "items": {
          "bsonType": "string",
          "title": "A genre Schema"
        }
      },
      "release_datum": {
        "bsonType": "object",
        "title": "The release_datum Schema",
        "required": ["$date"],
        "properties": {
          "$date": {
            "bsonType": "string",
            "title": "The $date Schema"
          }
        }
      },
      "plattformen": {
        "bsonType": "array",
        "title": "The plattformen Schema",
        "items": {
          "bsonType": "string",
          "title": "A plattform Schema"
        }
      },
      "publisher": {
        "bsonType": "object",
        "title": "The publisher Schema",
        "required": ["name", "kontakt"],
        "properties": {
          "name": {
            "bsonType": "string",
            "title": "The name Schema"
          },
          "website": {
            "bsonType": "string",
            "title": "The website Schema"
          },
          "kontakt": {
            "bsonType": "object",
            "title": "The kontakt Schema",
            "required": ["email", "telefon"],
            "properties": {
              "email": {
                "bsonType": "string",
                "title": "The email Schema"
              },
              "telefon": {
                "bsonType": "string",
                "title": "The telefon Schema"
              }
            }
          }
        }
      },
      "technologien": {
        "bsonType": "array",
        "title": "The technologien Schema",
        "items": {
          "bsonType": "object",
          "title": "A Schema",
          "required": ["name", "version", "sprache"],
          "properties": {
            "name": {
              "bsonType": "string",
              "title": "The name Schema"
            },
            "version": {
              "bsonType": "string",
              "title": "The version Schema"
            },
            "sprache": {
              "bsonType": "string",
              "title": "The sprache Schema"
            }
          }
        }
      },
      "entwickler": {
        "bsonType": "array",
        "title": "The entwickler Schema",
        "items": {
          "bsonType": "object",
          "title": "A entwickler Schema",
          "required": ["$oid"],
          "properties": {
            "$oid": {
              "bsonType": "string",
              "title": "The $oid Schema"
            }
          }
        }
      }
    },
    "additionalProperties": false
  }
}
```

**Ergebnisse:**

Fehlgeschlagene Validierung:
![](image/Pasted%20image%2020250308183929.png)

_Abbildung 3: Fehlgeschlagene Validierung_

Erfolgreiche Validierung:
![](image/Pasted%20image%2020250308184339.png)

_Abbildung 4: Erfolgreiche Validierung_
