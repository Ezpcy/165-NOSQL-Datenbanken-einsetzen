use Ubisoft;

db.Spiel.find({
    plattformen: "PC"
})

// Oder
db.Entwickler.find({
    $or: [
        {erfahrung: {$gte: 3}},
        {rolle: "Game Designer"}
    ]
})

// Und + Datum
db.Spiel.find({
    $and: [
        {genres: "Action"},
        {release_datum: {$gte: new Date("2007-01-01")}}
    ]
})


// Regex
db.Entwickler.find({name: {$regex: "Dupont", $options: "i"}})


// Projizieren
db.Entwickler.find({}, { _id: 1, name: 1 });

// Projizieren mit Ausnahme
db.Spiel.find({}, { _id: 0, name: 1 });