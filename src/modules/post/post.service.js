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

    async getPostById(id) {
      const post = await this.#model.findByPk(id);
      if (!post) throw new PostNotFoundError('post not found with this id');

      return post;
    }

    async createPost(PostDTO) {
      const { title, text } = PostDTO;

      const post = await this.#model.create({ title, text });
      if (!post) {
        throw new PostNotCreatedError('create post failed');
      }

      return post;
    }
  }

  return new PostService();
})();
