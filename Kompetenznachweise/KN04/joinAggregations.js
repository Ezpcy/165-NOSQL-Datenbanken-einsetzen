use Ubisoft;

db.Spiel.aggregate([
    {
        $lookup: {
            from: "Entwickler",
            localField: "entwickler",
            foreignField: "_id",
            as: "entwickler"
        }
    }
]);

// Games with Lead Developer
db.Spiel.aggregate([
    {
        $lookup: {
            from: "Entwickler",
            localField: "entwickler",
            foreignField: "_id",
            as: "entwickler"
        }
    },

    { $match: { "entwickler.rolle": "Lead Developer" } }
]);

// Games + projection: entwickler role "Game Designer" only developer name
db.Spiel.aggregate([
    {
        $lookup: {
            from: "Entwickler",
            localField: "entwickler",
            foreignField: "_id",
            as: "entwickler"
        }
    },

    { $match: { "entwickler.rolle": "Game Designer" } },
    { $project: { _id: 0, "entwickler.name": 1 } }
]);

// Entwickler lookup + unwind: Anzahl der Spiele pro Entwickler
db.Spiel.aggregate([
    {
        $lookup: {
            from: "Entwickler",
            localField: "entwickler",
            foreignField: "_id",
            as: "entwickler"
        }
    },

    { $unwind: "$entwickler" },
    {
        $group: {
            _id: "$entwickler.name",
            spiele: { $sum: 1 }
        }
    }
]);