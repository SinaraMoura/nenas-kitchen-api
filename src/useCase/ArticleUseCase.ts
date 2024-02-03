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

    async findAllArticles() {
        const result = await this.articleRepository.findAllArticle();
        return result;
    }

    async findArticlesById(id: string) {
        if (!id) throw new HttpException(400, 'Id is required');
        const result = await this.articleRepository.findArticlesById(id);
        return result;
    }

    async deleteArticle(id: string) {
        if (!id) throw new HttpException(400, 'Id is required');
        const result = await this.articleRepository.deleteArticle(id);
        return result;
    }

    async updateArticle(id: string, recipeData: Article) {
        const recipe = await this.articleRepository.findArticlesById(id);
        if (!recipe) throw new HttpException(400, 'Article not found');

        const result = await this.articleRepository.updateArticle(id, recipeData);
        return result;
    }

}
export { ArticleUseCase }