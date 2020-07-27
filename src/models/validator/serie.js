
class Serie {
    constructor({ nome, status }){
        if(nome && status){
            this.nome = nome;
            this.status = status;
            return;
        } 
        throw Error('Formato de serie inválido');
    }
}

module.exports = Serie;