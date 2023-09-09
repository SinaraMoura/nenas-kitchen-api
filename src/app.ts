import cors from 'cors';
import express, { Application } from 'express';
import path from 'node:path';
import { connect } from './infra/database';
import { errorMiddleware } from './middlewares/error.middlewares';
import { RecipeRouter } from './routers/recipe.routers';
import { ArticleRouter } from './routers/article.routers';
class App {
    public app: Application;
    private recipeRoutes = new RecipeRouter();
    private articleRoutes = new ArticleRouter();

    constructor() {
        this.app = express();
        this.middlewaresInitialize();
        this.initializeRoutes();
        this.interceptionError();
        connect();
    }
    private initializeRoutes() {
        this.app.use('/recipes', this.recipeRoutes.router);
        this.app.use('/articles', this.articleRoutes.router);
    }
    private interceptionError() {
        this.app.use(errorMiddleware);
    }
    private middlewaresInitialize() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(
            '/uploads',
            express.static(path.join(__dirname, 'tmp', 'uploads')),
        );
        this.app.use(express.urlencoded({ extended: true })); //text=Hello%20World
    }
    listen() {
        this.app.listen(3333, () => console.log('server is running'));
    }
}

export { App }