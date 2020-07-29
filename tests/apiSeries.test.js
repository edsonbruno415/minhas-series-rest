const app = require('../src/app');
const request = require('supertest');

const MOCK_SERIE = {
    nome: 'Harry Potter',
    status: 'assistido'
}

const MOCK_SERIE_ATUALIZAR = {
    nome: 'The Witcher',
    status: 'para assistir'
}

let MOCK_SERIE_ID_ATUALIZAR = 0;

describe('Teste API Minhas series',()=>{
    beforeAll(()=>{

    });

    test('Cadastrar uma serie', async ()=>{
        const response = await request(app)
            .post('/series')
            .set('accept','application/json')
            .send(MOCK_SERIE);

        const serie = response.body;
        MOCK_SERIE_ID_ATUALIZAR = serie.id;
        delete serie.id;

        const statusCode = response.statusCode;

        expect(statusCode).toBe(200);
        expect(serie).toEqual(MOCK_SERIE);
    });

    test('Retornar uma serie no formato válido', async()=>{
        const response = await request(app)
            .get('/series')
            .set('accept','application/json');

        const [serie] = response.body;
        const statusCode = response.statusCode;

        expect(statusCode).toBe(200);
        expect(serie.id).not.toBeUndefined();
        expect(serie.nome).not.toBeUndefined();
        expect(serie.status).not.toBeUndefined();
    });

    test('Atualizar uma serie', async()=>{
        const response = await request(app)
            .put(`/series/${MOCK_SERIE_ID_ATUALIZAR}`)
            .set('accept','application/json')
            .send(MOCK_SERIE_ATUALIZAR);

        const serieAtualizada = response.body;

        MOCK_SERIE_ATUALIZAR['id'] = MOCK_SERIE_ID_ATUALIZAR;
        const statusCode = response.statusCode;

        expect(statusCode).toBe(200);
        expect(serieAtualizada).toEqual(MOCK_SERIE_ATUALIZAR);
    });

    test('Excluir uma serie', async()=>{
        const response = await request(app)
            .delete(`/series/${MOCK_SERIE_ID_ATUALIZAR}`)
            .set('accept','application/json');

        const result = response.body;
        const statusCode = response.statusCode;

        expect(statusCode).toBe(200);
        expect(result.success).toBe(true);
    });
});