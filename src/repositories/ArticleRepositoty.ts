import { Article } from "../entities/Articles";

export interface ArticleRepository {
    addArticle(article: Article): Promise<Article>
}
