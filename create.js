import ObjectId from 'mongodb';

use Ubisoft;

const spiel1Id = new ObjectId();
const spiel2Id = new ObjectId();
const spiel3Id = new ObjectId();

const entwickler1Id = new ObjectId();
const entwickler2Id = new ObjectId();
const entwickler3Id = new ObjectId();

db.Spiel.insertOne({
    _id: spiel1Id,
    name: "Assassins Creed",
    genres: ["Action", "Adventure"],
    release_datum: new Date("2007-11-13"),
    plattformen: ["PC", "PS3", "Xbox 360"],
    publisher: {
        name: "Ubisoft",
        website: "https://www.ubisoft.com",
        kontakt: {
            email: "ubisoft@mailcom",
            telefon: "+33 1 48 18 50 00"
        }
    },
    technologien: [
        {
            name: "Anvil",
            version: "1.0",
            sprache: "C++"
        },
        {
            name: "Havok",
            version: "1.0",
            sprache: "C++"
        }
    ],
    entwickler: [entwickler1Id, entwickler2Id]
})

db.Spiel.insertMany([
    {
        _id: spiel2Id,
        name: "Ghosts Recon",
        genres: ["Action", "Shooter"],
        release_datum: new Date("2001-11-13"),
        plattformen: ["PC", "PS3", "Xbox 360"],
        publisher: {
            name: "Ubisoft",
            website: "https://www.ubisoft.com",
            kontakt: {
                email: "ubisoft@mailcom",
                telefon: "+33 1 48 18 50 00"
            }
        },
        technologien: [
            {
                name: "Anvil",
                version: "1.0",
                sprache: "C++"
            },
            {
                name: "Havok",
                version: "1.0",
                sprache: "C++"
            }
        ],
        entwickler: [entwickler1Id, entwickler3Id]
    },
    {
        _id: spiel3Id,
        name: "For Honor",
        genres: ["Action", "Fighting"],
        release_datum: new Date("2017-02-14"),
        plattformen: ["PC", "PS", "Xbox One"],
        publisher: {
            name: "Ubisoft",
            website: "https://www.ubisoft.com",
            kontakt: {
                email: "ubisoft@mailcom",
                telefon: "+33 1 48 18 50 00"
            }
        },
        technologien: [
            {
                name: "Anvil",
                version: "1.0",
                sprache: "C++"
            },
            {
                name: "Havok",
                version: "1.0",
                sprache: "C++"
            }
        ],
        entwickler: [entwickler2Id, entwickler3Id]
    },
]);

db.Entwickler.insertOne({
    _id: entwickler1Id,
    name: "Jean Raymond",
    email: "j.raymond@ubisoft.com",
    rolle: "Lead Developer",
    erfahrung: 5,
    spiele: [spiel1Id, spiel2Id]
});

db.Entwickler.insertMany([
    {
        _id: entwickler2Id,
        name: "Marie Dupont",
        email: "m.dupont@ubisoft.com",
        rolle: "Game Designer",
        erfahrung: 3,
        spiele: [spiel1Id, spiel3Id]
    },
    {
        _id: entwickler3Id,
        name: "Pierre Dupont",
        email: "p.dupont@ubisoft.com",
        rolle: "Game Designer",
        erfahrung: 2,
        spiele: [spiel2Id, spiel3Id]
    }
]);
