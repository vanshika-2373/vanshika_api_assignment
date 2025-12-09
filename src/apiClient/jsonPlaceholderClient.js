const axios = require('axios');
const ApiError = require('../errors/ApiError');

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000, // 5 seconds timeout
});

// Handle low-level axios errors and wrap into ApiError
async function safeGet(path) {
  try {
    const response = await api.get(path);

    // basic validation
    if (!response || typeof response.data === 'undefined') {
      throw new ApiError(502, 'Invalid response from external API');
    }

    return response.data;
  } catch (err) {
    if (err.code === 'ECONNABORTED') {
      // timeout
      throw new ApiError(504, 'External API timed out', { originalError: err.message });
    }

    if (err.response) {
      // external API ne khud error status diya
      throw new ApiError(
        err.response.status,
        `External API error: ${err.response.statusText}`,
        { originalError: err.message }
      );
    }

    // network ya koi unknown error
    throw new ApiError(502, 'Failed to reach external API', { originalError: err.message });
  }
}

// Public functions
async function fetchAllPosts() {
  return await safeGet('/posts');
}

async function fetchPostById(id) {
  if (!id) {
    throw new ApiError(400, 'Post ID is required');
  }
  return await safeGet(`/posts/${id}`);
}

module.exports = {
  fetchAllPosts,
  fetchPostById,
};
