import mongoose from 'mongoose';
import { Article } from '../entities/Articles';
import { ArticleRepository } from './ArticleRepositoty';

const articleSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: new mongoose.Types.ObjectId().toString(),
    },
    title: String,
    description: String,
    text: [String],
    image: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const ArticleModel = mongoose.model('Articles', articleSchema);

class ArticleRepositoryMongoose implements ArticleRepository {
    async addArticle(article: Article): Promise<Article> {
        const articleModel = new ArticleModel(article);

        await articleModel.save();
        return article;
    }
    async findAllArticle(): Promise<Article[]> {
        const findArticle = await ArticleModel.find().exec();
        return findArticle.map((article) => article.toObject());
    }
}
export { ArticleRepositoryMongoose };

