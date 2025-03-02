use Ubisoft;

// only under docs
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

// under docs filtered
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

// under docs unwind
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