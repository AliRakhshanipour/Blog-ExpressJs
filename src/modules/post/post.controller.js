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

    async getPosts(req, res, next) {
      try {
        const { posts, totalPosts, totalPages, currentPage, pageSize } =
          await this.#service.getPosts();

        res
          .status(StatusCodes.OK)
          .json({ posts, totalPosts, totalPages, currentPage, pageSize });
      } catch (error) {
        next(error);
      }
    }

    async getPostById(req, res, next) {
      try {
        const { id } = req.params;
        const post = await this.#service.getPostById(id);

        res.status(StatusCodes.OK).json({
          post,
        });
      } catch (error) {
        next(error);
      }
    }

    async createPost(req, res, next) {
      try {
        const { title, text } = req.body;
        const post = await this.#service.createPost({ title, text });

        res.status(StatusCodes.CREATED).json({
          post,
        });
      } catch (error) {
        next(error);
      }
    }
  }

  return new PostController();
})();
