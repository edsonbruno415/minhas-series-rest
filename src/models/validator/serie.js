const STATUS = [
    'para assistir',
    'assistido',
    'assistindo'
]

class Serie {
    constructor({ nome, status }){
        if(nome && status){
            this.nome = nome;
            this.status = status.toLowerCase();
            return;
        } 
        throw Error('Formato de serie inválido');
    }
}

module.exports = Serie;