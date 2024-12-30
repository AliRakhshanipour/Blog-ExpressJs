import autoBind from 'auto-bind';
import { StatusCodes } from 'http-status-codes';
import { PostService } from './post.service.js';

export const PostController = (() => {
  class PostController {
    #service;
    constructor() {
      autoBind(this);
      this.#service = PostService;
    }

    /**
     * Retrieve paginated posts.
     * Query Params:
     *  - page: Page number (default: 1)
     *  - limit: Posts per page (default: 10)
     */
    async getPosts(req, res, next) {
      try {
        // Extract pagination params from query string or use defaults
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;

        const { posts, totalPosts, totalPages, currentPage, pageSize } =
          await this.#service.getPosts(page, limit);

        res.status(StatusCodes.OK).json({
          posts,
          totalPosts,
          totalPages,
          currentPage,
          pageSize,
        });
      } catch (error) {
        next(error);
      }
    }

    /**
     * Retrieve a post by its ID.
     */
    async getPostById(req, res, next) {
      try {
        const { id: post_id } = req.params;
        const post = await this.#service.getPostById(post_id);

        res.status(StatusCodes.OK).json({ post });
      } catch (error) {
        next(error);
      }
    }

    /**
     * Create a new post.
     * Expected Body: { title: string, text: string }
     */
    async createPost(req, res, next) {
      try {
        const { title, text } = req.body;
        const post = await this.#service.createPost({ title, text });

        res.status(StatusCodes.CREATED).json({ post });
      } catch (error) {
        next(error);
      }
    }

    /**
     * Update an existing post by its ID.
     * Expected Body: { title?: string, text?: string }
     */
    async updatePost(req, res, next) {
      try {
        const { id: post_id } = req.params;
        const PostDTO = req.body;
        const post = await this.#service.updatePost(post_id, PostDTO);

        res.status(StatusCodes.OK).json({
          message: 'Post updated successfully',
          post,
        });
      } catch (error) {
        next(error);
      }
    }

    /**
     * Delete a post by its ID.
     */
    async deletePost(req, res, next) {
      try {
        const { id: post_id } = req.params;
        await this.#service.deletePost(post_id);

        // Option 1: Return a 204 with no content
        res.status(StatusCodes.NO_CONTENT).json({
          message: 'post deleted successfully',
        });
      } catch (error) {
        next(error);
      }
    }
  }

  return new PostController();
})();
