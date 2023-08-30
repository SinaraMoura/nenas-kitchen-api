import { Article } from "../entities/Articles";

export interface ArticleRepository {
    addArticle(article: Article): Promise<Article>
    findAllArticle(): Promise<Article[]>
    findArticlesById(id: string): Promise<Article | undefined>
}
