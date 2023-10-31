// set or create database: use myDatabase

// Create collection
db.createCollection("myCollection");

// Create TTL index with longer TTL expiration
db.myCollection.createIndex({ created: 1 }, { expireAfterSeconds: 31622400 });  

// Populate database with fake documents
for (let count = 0; count < 10000; count++) {
    let documents = [];
    for (let i = 0; i < 10000; i++) {
        const name = "Some name here";
        const created = ISODate('2023-02-23T16:30:00.000Z');
        let document = {
            name: name,
            created: created
        };
        documents.push(document);
    }
    db.myCollection.insertMany(documents);
}

// Update TTL index
db.sendStatus.runCommand({
    collMod: "myCollection",
    index: {
       keyPattern: { created : 1 },
       expireAfterSeconds: 7776000
    }
 })
 