use Ubisoft;

db.createUser({
    user: "reader",
    pwd: "Password1",
    roles: [{ role: "read", db: "Ubisoft" }]
});

use admin;

db.createUser({
    user: "readerWriter",
    pwd: "Password1",
    roles: [{ role: "readWrite", db: "Ubisoft" }]
});