const { connectToDatabase,
  castToObjectId,
  isValidObjectId,
} = require('./_mongo');

module.exports = async (req, res) => {
  const {
    postId,
    content,
    tags
  } = req.body;

  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = await db.collection('microblog');
  const post = await collection.updateOne({
    _id: castToObjectId(postId),
  }, {
    $set: {
      content,
      tags,
      updatedAt: new Date(),
    }
  });
  res.status(200).json({
    status: 200,
    message: 'Post updated successfully'
  });
}