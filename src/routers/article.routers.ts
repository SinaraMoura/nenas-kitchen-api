import { Router } from "express";
import { ArticleController } from "../controllers/ArticleController";
import { ArticleRepositoryMongoose } from "../repositories/ArticleRepositoryMongoose";
import { ArticleUseCase } from "../useCase/ArticleUseCase"

class ArticleRouter {
    public router: Router;
    private articleController: ArticleController;
    constructor() {
        this.router = Router();
        const articleRepository = new ArticleRepositoryMongoose();
        const articleUseCase = new ArticleUseCase(articleRepository);
        this.articleController = new ArticleController(articleUseCase);
        this.initRoutes();
    }
    initRoutes() {
        this.router.post(
            '/',
            this.articleController.create.bind(this.articleController)
        );
    }
}

export { ArticleRouter }