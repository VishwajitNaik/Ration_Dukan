/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("Milkhub");

// Find a document in a collection.
const users = db.getCollection("users")
  .find({
    registerNo: { $in: [15, 17] },
    createdBy: ObjectId("6a6b58ea570185e25d8c0a76")
  })
  .toArray();

const milkRecordIds = users.flatMap(user => user.milkRecords);

db.getCollection("milks").find({
  _id: { $in: milkRecordIds }
});
