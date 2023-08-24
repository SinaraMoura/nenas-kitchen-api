import { Router } from "express";

class RecipeRouter {
    public router: Router;
    constructor() {
        this.router = Router();
    }
}

export { RecipeRouter }