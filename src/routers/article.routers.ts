import { Router } from "express";
import { ArticleController } from "../controllers/ArticleController";
import { ArticleRepositoryMongoose } from "../repositories/ArticleRepositoryMongoose";
import { ArticleUseCase } from "../useCase/ArticleUseCase"
import { upload } from '../infra/multer';

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
            upload.single('image'),
            this.articleController.create.bind(this.articleController)
        );
        this.router.get(
            '/list',
            this.articleController.findAllArticles.bind(this.articleController)
        );
        this.router.get(
            '/id',
            this.articleController.findArticlesById.bind(this.articleController)
        );
        this.router.delete(
            '/delete/:id',
            this.articleController.deleteArticle.bind(this.articleController)
        )

        this.router.put(
            '/update/:id',
            upload.single('image'),
            this.articleController.updateArticle.bind(this.articleController)
        )
    }
}

export { ArticleRouter }