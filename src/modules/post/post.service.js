import autoBind from 'auto-bind';
import { models } from '../../models/index.js';
import { PostNotCreatedError, PostNotFoundError } from './post.errors.js';

export const PostService = (() => {
  class PostService {
    #model;

    constructor() {
      autoBind(this);
      this.#model = models.Post;
    }

    /**
     * Retrieve a paginated list of posts.
     * @param {number} page - The page number to retrieve (1-based).
     * @param {number} limit - The number of posts per page.
     * @returns {Promise<object>} - Object containing posts, total count, total pages, current page, and page size.
     */
    async getPosts(page = 1, limit = 10) {
      const offset = (page - 1) * limit;

      const { count, rows } = await this.#model.findAndCountAll({
        limit,
        offset,
      });

      const totalPages = Math.ceil(count / limit);

      return {
        posts: rows,
        totalPosts: count,
        totalPages,
        currentPage: page,
        pageSize: limit,
      };
    }

    /**
     * Retrieve a single post by its unique identifier.
     * @param {number} id - The ID of the post.
     * @returns {Promise<Post>} - The post object if found.
     * @throws {PostNotFoundError} - If the post does not exist.
     */
    async getPostById(id) {
      const post = await this.#model.findByPk(id);
      if (!post) {
        throw new PostNotFoundError('Post not found with this ID.');
      }
      return post;
    }

    /**
     * Create a new post.
     * @param {object} PostDTO - Data Transfer Object containing post data.
     * @param {string} PostDTO.title - The title of the post.
     * @param {string} PostDTO.text - The text/content of the post.
     * @returns {Promise<Post>} - The newly created post.
     * @throws {PostNotCreatedError} - If the post creation fails.
     */
    async createPost(PostDTO) {
      const { title, text } = PostDTO;
      const post = await this.#model.create({ title, text });
      if (!post) {
        throw new PostNotCreatedError('Creating a post failed.');
      }
      return post;
    }

    /**
     * Update an existing post by its ID.
     * @param {number} id - The ID of the post to update.
     * @param {object} PostDTO - Data Transfer Object containing updated post data.
     * @param {string} PostDTO.title - The updated title of the post.
     * @param {string} PostDTO.text - The updated text/content of the post.
     * @returns {Promise<Post>} - The updated post.
     * @throws {PostNotFoundError} - If the post does not exist.
     */
    async updatePost(id, PostDTO) {
      const { title, text } = PostDTO;
      const post = await this.#model.findByPk(id);

      if (!post) {
        throw new PostNotFoundError('Post not found with this ID.');
      }

      await post.update({ title, text });
      await post.save();

      return post;
    }

    /**
     * Delete a post by its ID.
     * @param {number} id - The ID of the post to delete.
     * @throws {PostNotFoundError} - If the post does not exist.
     */
    async deletePost(id) {
      const post = await this.#model.findByPk(id);
      if (!post) {
        throw new PostNotFoundError('Post not found with this ID.');
      }

      await post.destroy();
    }
  }

  return new PostService();
})();
