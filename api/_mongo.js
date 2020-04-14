const url = require('url');
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedDb) {
    console.log('cachedDb');
    return cachedDb;
  }
  const client = await mongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = await client.db(url.parse(uri).pathname.substr(1));

  cacheDb = db;
  return db;
}

module.exports = {
  connectToDatabase,
  castToObjectId: mongodb.ObjectID,
  isValidObjectId: mongodb.ObjectID.isValid,
};
