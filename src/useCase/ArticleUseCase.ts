import { Article } from '../entities/Articles';
import { HttpException } from '../interfaces/HttpException';
import { ArticleRepository } from '../repositories/ArticleRepositoty';

class ArticleUseCase {
    constructor(private articleRepository: ArticleRepository) { }

    async create(articleData: Article) {
        if (!articleData.title) {
            throw new HttpException(400, 'Title is required');
        }
        if (!articleData.text) {
            throw new HttpException(400, 'Text is required');
        }

        const result = await this.articleRepository.addArticle(articleData);
        return result;
    }
}
export { ArticleUseCase }