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
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const RecipeModel = mongoose.model('Articles', articleSchema);

class ArticleRepositoryMongoose implements ArticleRepository {
    async addArticle(article: Article): Promise<Article> {
        const recipeModel = new RecipeModel(article);

        await recipeModel.save();
        return article;
    }
}
export { ArticleRepositoryMongoose };

