import mongoose from 'mongoose';
import { Article } from '../entities/Articles';
import { ArticleRepository } from './ArticleRepositoty';
import { v4 as uuidv4 } from 'uuid';

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
        article._id = uuidv4()
        const articleModel = new ArticleModel(article);

        await articleModel.save();
        return article;
    }
    async findAllArticle(): Promise<Article[]> {
        const findArticle = await ArticleModel.find().exec();
        return findArticle.map((article) => article.toObject());
    }

    async findArticlesById(id: string): Promise<Article | undefined> {
        const findArticle = await ArticleModel.findById({ _id: id }).exec();
        return findArticle ? findArticle.toObject() : undefined
    }

    async deleteArticle(id: string): Promise<any> {
        const deleteArticle = await ArticleModel.deleteOne({ _id: id }).exec();
        return deleteArticle;
    }

    async updateArticle(id: string, article: Article): Promise<Article | undefined> {
        const updateArticle = await ArticleModel.findOneAndUpdate({ _id: id }, article,{ new: true }).exec();
        return updateArticle ? updateArticle.toObject() : undefined
    }
}
export { ArticleRepositoryMongoose };

