use Ubisoft;

const spielIdToUpdate = new ObjectId("67c1d443e85895fb04074664");

db.Spiel.updateOne(
    { _id: spielIdToUpdate },
    { $set: { name: "Assassin's Creed: Valhalla" } }
)

db.Entwickler.updateMany({
    $or: [
        { erfahrung: { $gte: 3 } },
        { rolle: "Game Designer" }
    ],
},
    { $set: { rolle: "Senior Game Designer" } }
)

db.Spiel.replaceOne(
    { name: "For Honor" },
    {
        name: "For Honor 2",
        genres: ["Action", "Fighting"],
        release_datum: new Date("2022-03-15"),
        plattformen: ["PC", "PS5", "Xbox Series X"],
        publisher: "Ubisoft",
        technologies: ["Anvil", "Havok"],
        entwickler: [
            {
                _id: new ObjectId("67c1d443e85895fb04074666"),
            },
            {
                _id: new ObjectId("67c1d443e85895fb04074667"),
            },
        ]
    }
)