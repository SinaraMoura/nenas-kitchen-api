import { NextFunction, Request, Response } from 'express';
import { Article } from '../entities/Articles';
import { ArticleUseCase } from '../useCase/ArticleUseCase';

class ArticleController {
    constructor(private articleUseCase: ArticleUseCase) { }

    async create(req: Request, res: Response, next: NextFunction) {
        let articleData: Article = req.body;
        const files = req.files as any;

        try {
            if (files) {
                const image = files.image[0];
                articleData = {
                    ...articleData,
                    image: image.filename
                };
            }
            await this.articleUseCase.create(articleData);
            return res.status(201).json({ message: "Artigo adicionado com sucesso." })
        } catch (error) {
            next(error)
        }
    }

    async findAllArticles(req: Request, res: Response, next: NextFunction) {
        try {
            const articles = await this.articleUseCase.findAllArticles();
            return res.status(200).json(articles)
        } catch (error) {
            next(error)
        }
    }

    async findArticlesById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.query;
        try {
            const article = await this.articleUseCase.findArticlesById(String(id));
            return res.status(200).json(article);
        } catch (error) {
            next(error)
        }
    }
}
export { ArticleController }