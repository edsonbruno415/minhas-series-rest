const axios = require('axios');
const url = 'http://localhost:3000/series';

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
    beforeEach(()=>{

    });

    test('Cadastrar uma serie', async ()=>{
        const request = await axios.post(url, MOCK_SERIE);
        const serie = request.data;

        MOCK_SERIE_ID_ATUALIZAR = serie.id;
        delete serie.id;

        expect(serie).toEqual(MOCK_SERIE);
    });

    test('Retornar uma serie no formato válido', async()=>{
        const series = await axios.get(url);
        const [serie] = series.data;

        expect(serie.id).not.toBeUndefined();
        expect(serie.nome).not.toBeUndefined();
        expect(serie.status).not.toBeUndefined();
    });

    test('Atualizar uma serie', async()=>{
        const request = await axios.put(`${url}/${MOCK_SERIE_ID_ATUALIZAR}`, MOCK_SERIE_ATUALIZAR);
        const serieAtualizada = request.data;

        MOCK_SERIE_ATUALIZAR['id'] = MOCK_SERIE_ID_ATUALIZAR;

        expect(serieAtualizada).toEqual(MOCK_SERIE_ATUALIZAR);
    });

    test('Excluir uma serie', async()=>{
        const request = await axios.delete(`${url}/${MOCK_SERIE_ID_ATUALIZAR}`);
        const result = request.data;

        expect(result.success).toBe(true);
    });
});