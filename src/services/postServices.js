const { fetchAllPosts, fetchPostById } = require('../apiClient/jsonPlaceholderClient');
const { getCache, setCache } = require('../cache/memoryCache');
const ApiError = require('../errors/ApiError');

const ALL_POSTS_CACHE_KEY = 'all_posts';

async function getPostsWithFilters(filters) {
  // 1. Try cache first
  let posts = getCache(ALL_POSTS_CACHE_KEY);

  // 2. If cache miss, fetch from external API and store
  if (!posts) {
    posts = await fetchAllPosts();

    // basic validation (invalid / malformed fields)
    if (!Array.isArray(posts)) {
      throw new ApiError(502, 'External API returned unexpected format');
    }

    // Ensure required fields exist (id, userId, title, body)
    posts = posts.filter(
      (p) =>
        typeof p.id === 'number' &&
        typeof p.userId === 'number' &&
        typeof p.title === 'string' &&
        typeof p.body === 'string'
    );

    setCache(ALL_POSTS_CACHE_KEY, posts, 60 * 1000); // cache for 60 seconds
  }

  // 3. Apply filters
  const { userId, title } = filters;

  let filtered = posts;

  if (userId) {
    const uid = Number(userId);
    if (Number.isNaN(uid)) {
      throw new ApiError(400, 'userId must be a number');
    }
    filtered = filtered.filter((p) => p.userId === uid);
  }

  if (title) {
    const lower = title.toLowerCase();
    filtered = filtered.filter((p) => p.title.toLowerCase().includes(lower));
  }

  return filtered;
}

async function getPostDetail(id) {
  const numericId = Number(id);
  if (Number.isNaN(numericId)) {
    throw new ApiError(400, 'Post ID must be a number');
  }

  // Optional: cache per-id too (simple version: just call API)
  const post = await fetchPostById(numericId);

  if (!post || typeof post.id === 'undefined') {
    throw new ApiError(404, 'Post not found');
  }

  return post;
}

module.exports = {
  getPostsWithFilters,
  getPostDetail,
};
