const {
  connectToDatabase,
  castToObjectId,
  isValidObjectId,
} = require('../_mongo');

module.exports = async (req, res) => {
  const postId = req.query.postId;

  if (!isValidObjectId(postId)) {
    return res.status(400).json({
      status: 400,
      message: 'postId is not valid',
    });
  }

  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = await db.collection('microblog');
  const result = await collection.deleteOne({ _id: castToObjectId(postId) });
  res.status(200).json({
    status: 200,
    message: 'Deleted successfully',
  });
};
