const postService = require('../services/postService');

async function listPosts(req, res, next) {
  try {
    const filters = {
      userId: req.query.userId,
      title: req.query.title,
    };

    const posts = await postService.getPostsWithFilters(filters);

    res.json({
      count: posts.length,
      data: posts,
    });
  } catch (err) {
    next(err); // pass error to errorHandler
  }
}

async function getPostById(req, res, next) {
  try {
    const id = req.params.id;
    const post = await postService.getPostDetail(id);

    res.json({
      data: post,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listPosts,
  getPostById,
};
