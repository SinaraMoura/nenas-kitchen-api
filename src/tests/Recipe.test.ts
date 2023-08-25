import request from 'supertest';
import { App } from '../app';
import { Recipe } from '../entities/Recipe';
import { RecipeUseCase } from '../useCase/RecipeUseCase';

const app = new App();
const express = app.app;

describe('Recipes test', () => {

    //     const recipe = {
    //         title: 'Pernil Assado Com Hellmanns',
    //         duration: '300 minutos',
    //         difficulty: 'Médio',
    //         category: 'Carnes',
    //         date: new Date(),
    //         ingredients: [
    //             "1 pernil suíno sem osso cerca de 3 kg",
    //             "1 colher de chá de sal",
    //             "2 xícaras de chá de vinho branco seco",
    //             "3 colheres de sopa de azeite",
    //             "4 dentes de alho picado",
    //             "2 folhas de louro seco",
    //             "2 ramos de alecrim fresco",
    //             "1 xícara de chá de Maionese Hellmann's"
    //         ],
    //         preparation: [
    //             "Pré-aqueça o forno em temperatura média (200°C).",
    //             "Em uma assadeira grande, coloque o pernil e, com o auxílio de um garfo, faça furos pela superfície.",
    //             "Polvilhe o sal, regue com o vinho branco e o azeite, e disponha na superfície o alho, as folhas de louro e o alecrim. Cubra e deixe tomar gosto na geladeira, por no mínimo 3 horas, virando-o na metade do tempo.",
    //             "Retire da geladeira, passe a maionese HELLMANNS por todo o pernil, cubra com papel-alumínio e leve ao forno, por 1 hora e 30 minutos. Remova o papel-alumínio e volte ao forno por mais 1 hora, ou até dourar a superfície e a carne estar assada por dentro.",
    //             "Retire o pernil do forno, fatie-o, disponha em uma travessa e sirva."
    //         ]
    //     };
    //     const res = await request(express)
    //         .post('/recipes')
    //         .field('title', recipe.title)
    //         .field('duration', recipe.duration)
    //         .field('difficulty', recipe.difficulty)
    //         .field("category", recipe.category)
    //         .field("date", recipe.date.toISOString())
    //         .field('ingredients', recipe.ingredients)
    //         .field('preparation', recipe.preparation)

    //     if (res.error) {
    //         console.log("🚀 ~ file: Recipe.test.ts:46 ~ it ~ res.error:", res.error)
    //     }

    //     expect(res.status).toBe(201);
    //     expect(res.body).toEqual({ message: 'Receita adicionada com sucesso.' });
    // });
    it('/POST ', async () => {
        const response = await request(express)
            .post('/recipes')
            .send({
                title: 'Pernil Assado Com Hellmanns',
                duration: '300 minutos',
                difficulty: 'Médio',
                category: 'Carnes',
                date: new Date(),
                ingredients: [
                    "1 pernil suíno sem osso cerca de 3 kg",
                    "1 colher de chá de sal",
                    "2 xícaras de chá de vinho branco seco",
                    "3 colheres de sopa de azeite",
                    "4 dentes de alho picado",
                    "2 folhas de louro seco",
                    "2 ramos de alecrim fresco",
                    "1 xícara de chá de Maionese Hellmann's"
                ],
                preparation: [
                    "Pré-aqueça o forno em temperatura média (200°C).",
                    "Em uma assadeira grande, coloque o pernil e, com o auxílio de um garfo, faça furos pela superfície.",
                    "Polvilhe o sal, regue com o vinho branco e o azeite, e disponha na superfície o alho, as folhas de louro e o alecrim. Cubra e deixe tomar gosto na geladeira, por no mínimo 3 horas, virando-o na metade do tempo.",
                    "Retire da geladeira, passe a maionese HELLMANNS por todo o pernil, cubra com papel-alumínio e leve ao forno, por 1 hora e 30 minutos. Remova o papel-alumínio e volte ao forno por mais 1 hora, ou até dourar a superfície e a carne estar assada por dentro.",
                    "Retire o pernil do forno, fatie-o, disponha em uma travessa e sirva."
                ]
            })

        if (response.error) {
            console.log("🚀 ~ file: Recipe.test.ts:81 ~ it ~ response.error:", response.error)
        }

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: 'Receita adicionada com sucesso.' });


    })

    it('/GET /list all recipes ', async () => {
        const response = await request(express).get('/recipes/list');

        if (response.error) {
        }

        expect(response.status).toBe(200);
        // expect(response.body.length).toBeGreaterThan(0);
    });

    it('/GET/id/:id  recipe by id', async () => {
        const response = await request(express).get(
            '/recipes/id/64e90bbc3cb3376d7d3535de',
        );

        if (response.error) {
            console.log("🚀 ~ file: Recipe.test.ts:59 ~ it ~ response.error:", response.error)
        }

        expect(response.status).toBe(200);
    });

    it('/GET/title recipe by id', async () => {
        const response = await request(express).get(
            '/recipes/title?name=Pernil Assado Com Hellmanns',
        );

        if (response.error) {
            console.log("🚀 ~ file: Recipe.test.ts:59 ~ it ~ response.error:", response.error)
        }

        expect(response.status).toBe(200);
    });
    it('/GET /category/:category recipe by category', async () => {
        const response = await request(express).get('/recipes/category/Carnes');

        if (response.error) {
            console.log("🚀 ~ file: Recipe.test.ts:69 ~ it ~ response.error:", response.error)
        }

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('/GET /difficulty/ recipe by difficulty', async () => {
        const response = await request(express).get('/recipes/difficulty?name=Fácil');

        if (response.error) {
            console.log("🚀 ~ file: Recipe.test.ts:69 ~ it ~ response.error:", response.error)
        }

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('/DEL /delete/:id delete recipes', async () => {
        const response = await request(express).delete('/recipes/delete/64e8f5d392f32af82e609480');

        if (response.error) {
            console.log("🚀 ~ file: Recipe.test.ts:69 ~ it ~ response.error:", response.error)
        }

        expect(response.status).toBe(200);

    });
    it('/PUT /update/:id update recipes', async () => {
        const response = await request(express)
            .put('/recipes/update/64e90bbc3cb3376d7d3535de')
            .send({
                title: "Pernil assado",
                preparation: [
                    "Preparo do pernil"
                ]
            })
        if (response.error) {
            console.log("🚀 ~ file: Recipe.test.ts:69 ~ it ~ response.error:", response.error)
        }

        expect(response.status).toBe(204);

    });

})
const recipeRepository = {
    addRecipe: jest.fn(),
    findAllRecipe: jest.fn(),
    findRecipesByCategory: jest.fn(),
    findRecipesByDifficulty: jest.fn(),
    findRecipesByName: jest.fn(),
    findRecipesById: jest.fn(),
    updateRecipes: jest.fn(),
    deleteRecipes: jest.fn(),
};

const recipeUseCase = new RecipeUseCase(recipeRepository)
const recipe: Recipe = {
    title: 'Pernil Assado Com Hellmann’s',
    duration: '300 minutos',
    difficulty: 'Médio',
    category: 'Carnes',
    date: new Date(),
    ingredients: [
        "1 pernil suíno sem osso cerca de 3 kg",
        "1 colher de chá de sal",
        "2 xícaras de chá de vinho branco seco",
        "3 colheres de sopa de azeite",
        "4 dentes de alho picado",
        "2 folhas de louro seco",
        "2 ramos de alecrim fresco",
        "1 xícara de chá de Maionese Hellmann's"
    ],
    preparation: [
        "Pré-aqueça o forno em temperatura média (200°C).",
        "Em uma assadeira grande, coloque o pernil e, com o auxílio de um garfo, faça furos pela superfície.",
        "Polvilhe o sal, regue com o vinho branco e o azeite, e disponha na superfície o alho, as folhas de louro e o alecrim. Cubra e deixe tomar gosto na geladeira, por no mínimo 3 horas, virando-o na metade do tempo.",
        "Retire da geladeira, passe a maionese HELLMANN´S por todo o pernil, cubra com papel-alumínio e leve ao forno, por 1 hora e 30 minutos. Remova o papel-alumínio e volte ao forno por mais 1 hora, ou até dourar a superfície e a carne estar assada por dentro.",
        "Retire o pernil do forno, fatie-o, disponha em uma travessa e sirva."
    ]
};
describe('Unit Test', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return an array of recipes by category', async () => {
        recipeRepository.findRecipesByCategory.mockResolvedValue([recipe]);
        const result = await recipeUseCase.findRecipesByCategory('Carnes');

        expect(result).toEqual([recipe]);
        expect(recipeRepository.findRecipesByCategory).toHaveBeenCalledWith('Carnes');
    });
    it('should return an array of recipes by difficulty', async () => {
        recipeRepository.findRecipesByDifficulty.mockResolvedValue([recipe]);
        const result = await recipeUseCase.findRecipesByDifficylty('Médio');

        expect(result).toEqual([recipe]);
        expect(recipeRepository.findRecipesByDifficulty).toHaveBeenCalledWith('Médio');
    });
    it('should return an array of recipes by name', async () => {
        recipeRepository.findRecipesByName.mockResolvedValue([recipe]);
        const result = await recipeUseCase.findRecipesByName('Pernil Assado Com Hellmann’s');

        expect(result).toEqual([recipe]);
        expect(recipeRepository.findRecipesByName).toHaveBeenCalledWith(
            'Pernil Assado Com Hellmann’s',
        );
    });
    it('should return a recipe by Id', async () => {
        recipeRepository.findRecipesById.mockResolvedValueOnce(recipe);
        const result = await recipeUseCase.findRecipesById(
            '64e90bbc3cb3376d7d3535de',
        );

        expect(result).toEqual(recipe);
        expect(recipeRepository.findRecipesById).toHaveBeenCalledWith(
            '64e90bbc3cb3376d7d3535de',
        );
    });
    it('should return all recipes', async () => {
        recipeRepository.findAllRecipe.mockResolvedValue([recipe]);
        const result = await recipeUseCase.findAllRecipes();

        expect(result).toEqual([recipe]);
    });
});
