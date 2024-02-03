import { NextFunction, Request, Response } from 'express';
import { Article } from '../entities/Articles';
import { ArticleUseCase } from '../useCase/ArticleUseCase';
const { uploadFile } = require('../infra/storage.ts');
class ArticleController {
    constructor(private articleUseCase: ArticleUseCase) { }

    async create(req: Request, res: Response, next: NextFunction) {
        let articleData: Article = req.body;
        const file = req.file as any;

        try {
            if (file) {
                const arquivo = await uploadFile(
                    `imagens/${file.originalname}`,
                    file.buffer,
                    file.mimetype
                )
                articleData = {
                    ...articleData,
                    image: arquivo.url
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

    async deleteArticle(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const article = await this.articleUseCase.deleteArticle(id);
            return res.status(200).json(article);
        } catch (error) {
            next(error)
        }
    }
}
export { ArticleController }