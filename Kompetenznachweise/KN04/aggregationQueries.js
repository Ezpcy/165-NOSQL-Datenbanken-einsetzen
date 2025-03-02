use Ubisoft;

// Aggregation queries
db.Spiel.aggregate([
    { $match: { release_datum: { $gte: new Date("2007-01-01") } } },  
    { $match: { genres: "Action" } } 
]);

// Match, Project, Sort
db.Spiel.aggregate([
    { $match: { genres: "Action" } },
    { $project: { _id: 0, name: 1, release_datum: 1 } },
    { $sort: { release_datum: -1 } }
]);

// $sum + $group
db.Entwickler.aggregate([
    { $group: { _id: null, total_entwickler: { $sum: 1 } } } 
]);
