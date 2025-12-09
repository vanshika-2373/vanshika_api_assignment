const express = require('express');
const { listPosts, getPostById } = require('../controllers/postController');

const router = express.Router();

// GET /posts?userId=&title=
router.get('/', listPosts);

// GET /posts/:id
router.get('/:id', getPostById);

module.exports = router;
