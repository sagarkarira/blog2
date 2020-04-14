const { connectToDatabase } = require('./_mongo');

module.exports = async (req, res) => {
  const { name, content, tags } = req.body;

  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = await db.collection('microblog');
  const post = await collection.insertOne({
    name,
    content,
    tags,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.status(200).json({
    data: {
      post,
    },
    status: 201,
    message: 'Created a new post successfully',
  });
};
