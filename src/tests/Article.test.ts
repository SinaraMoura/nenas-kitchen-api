import request from 'supertest';
import { App } from '../app';
import { Article } from '../entities/Articles';
import { ArticleUseCase } from '../useCase/ArticleUseCase';

const app = new App();
const express = app.app;

describe('Articles test', () => {
    it('/POST ', async () => {
        const article = {
            title: 'Aprenda a refogar legumes e deixe suas receitas mais gostosas',
            description: "Método prático e rápido de preparar legumes, refogar é uma boa alternativa também porque não deixa o alimento perder seu valor nutricional. Mas como é exatamente o ato de refogar? Em poucas palavras, refogar é parecido com fritar, mas, nesse processo, o cozinheiro deve mexer incessantemente o alimento com um pouco de gordura – geralmente óleo ou azeite – até ganhar cor, textura e, principalmente, aroma. O cheiro de um refogado geralmente é aquele que faz inveja a toda a vizinhança.Quer aprender como refogar legumes e preparar pratos deliciosos em oito lições? Confira a seguir!",
            text: [
                "Escolha a panela ideal. As do tipo Wok e as frigideiras mais fundas são as mais indicadas",
                "Fatie os legumes em cubos para que sejam cozidos uniformemente e de forma rápida",
                "Corte em tiras finas vegetais longos como abobrinha, pepino e cenoura",
                "Separe couves-flores e brócolis em pequenos pedaços",
                "Use sal e outros temperos a gosto, como os caldos KNORR, que dão um toque gourmet a qualquer receita",
                "Aqueça a panela e, quando ela estiver bem quente, acrescente um fio de azeite em suas laterais. Acrescente os legumes a seguir",
                "Coloque os ingredientes aos poucos na frigideira, do legume mais “duro” ao mais “macio",
                " Utilize uma colher de pau ou escumadeira tipo chinesa para mexer os legumes",
                "Aguarde até os legumes corarem. Tem quem goste de um pouco de gostinho de tostado, quando o ingrediente “pega” no fundo da panela. Se não for o seu caso, retire quando eles ganharem cor e estiverem na textura ideal. Pronto! É só servir."
            ]
        }
        const response = await request(express)
            .post('/articles')
            .field('title', article.title)
            .field('description', article.description)
            .field('text', article.text)
            .attach('image', '/Users/Sinara/Downloads/legumes.webp')

        if (response.error) {
            console.log("🚀 ~ file: Recipe.test.ts:81 ~ it ~ response.error:", response.error)
        }

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: 'Artigo adicionado com sucesso.' });
    })

    it('/GET /list all artigos ', async () => {
        const response = await request(express).get('/articles/list');

        if (response.error) {
        }

        expect(response.status).toBe(200);
        // expect(response.body.length).toBeGreaterThan(0);
    });

    it('/GET/id/:id  recipe by id', async () => {
        const response = await request(express).get(
            '/articles/id/64ef853a926dc725544ecd02',
        );

        if (response.error) {
            console.log("🚀 ~ file: Recipe.test.ts:59 ~ it ~ response.error:", response.error)
        }

        expect(response.status).toBe(200);
    });



})
const articleRepository = {
    addArticle: jest.fn(),
    findAllArticle: jest.fn(),
    findArticlesById: jest.fn()
};

const articleUseCase = new ArticleUseCase(articleRepository)
const article: Article = {
    _id: '',
    title: 'Aprenda a refogar legumes e deixe suas receitas mais gostosas',
    description: "Método prático e rápido de preparar legumes, refogar é uma boa alternativa também porque não deixa o alimento perder seu valor nutricional. Mas como é exatamente o ato de refogar? Em poucas palavras, refogar é parecido com fritar, mas, nesse processo, o cozinheiro deve mexer incessantemente o alimento com um pouco de gordura – geralmente óleo ou azeite – até ganhar cor, textura e, principalmente, aroma. O cheiro de um refogado geralmente é aquele que faz inveja a toda a vizinhança.Quer aprender como refogar legumes e preparar pratos deliciosos em oito lições? Confira a seguir!",
    text: [
        "Escolha a panela ideal. As do tipo Wok e as frigideiras mais fundas são as mais indicadas",
        "Fatie os legumes em cubos para que sejam cozidos uniformemente e de forma rápida",
        "Corte em tiras finas vegetais longos como abobrinha, pepino e cenoura",
        "Separe couves-flores e brócolis em pequenos pedaços",
        "Use sal e outros temperos a gosto, como os caldos KNORR, que dão um toque gourmet a qualquer receita",
        "Aqueça a panela e, quando ela estiver bem quente, acrescente um fio de azeite em suas laterais. Acrescente os legumes a seguir",
        "Coloque os ingredientes aos poucos na frigideira, do legume mais “duro” ao mais “macio",
        " Utilize uma colher de pau ou escumadeira tipo chinesa para mexer os legumes",
        "Aguarde até os legumes corarem. Tem quem goste de um pouco de gostinho de tostado, quando o ingrediente “pega” no fundo da panela. Se não for o seu caso, retire quando eles ganharem cor e estiverem na textura ideal. Pronto! É só servir."
    ],
    image: 'legumes.webp'
};
describe('Unit Test', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all articles', async () => {
        articleRepository.findAllArticle.mockResolvedValue([article]);
        const result = await articleUseCase.findAllArticles();

        expect(result).toEqual([article]);
    });

    it('should return a article by Id', async () => {
        articleRepository.findArticlesById.mockResolvedValueOnce(article);
        const result = await articleUseCase.findArticlesById(
            '64ef853a926dc725544ecd02',
        );

        expect(result).toEqual(article);
        expect(articleRepository.findArticlesById).toHaveBeenCalledWith(
            '64ef853a926dc725544ecd02',
        );
    });
});
