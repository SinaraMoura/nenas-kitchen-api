import { NextFunction, Request, Response } from 'express';
import { Article } from '../entities/Articles';
import { ArticleUseCase } from '../useCase/ArticleUseCase';

class ArticleController {
    constructor(private articleUseCase: ArticleUseCase) { }

    async create(req: Request, res: Response, next: NextFunction) {
        let articleData: Article = req.body;

        try {
            await this.articleUseCase.create(articleData);
            console.log("🚀 ~ file: ArticleController.ts:13 ~ ArticleController ~ create ~ articleData:", articleData)
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
}
export { ArticleController }