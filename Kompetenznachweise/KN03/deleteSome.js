use Ubisoft

const spiel1Id = new ObjectId("67c1cec20e390529c1c95c7b");

const entwickler1Id = new ObjectId("67c1cec20e390529c1c95c7e");
const entwickler2Id = new ObjectId("67c1cec20e390529c1c95c7f");

db.Spiel.deleteOne({ _id: spiel1Id });
db.Entwickler.deleteMany({ 
    $or: [
        { _id: entwickler1Id },
        { _id: entwickler2Id }
    ]
});

db.Entwickler.find({
    _id: { $in: [entwickler1Id, entwickler2Id] }
});


print("Successfully deleted the documents.");