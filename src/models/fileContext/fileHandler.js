const IContext = require('../context/interfaces/IContext');
const path = require('path');
const {
    readFile,
    writeFile,
    writeFileSync,
    existsSync
} = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class FileContext extends IContext {
    constructor(fileName) {
        super();
        this._file = /\.json$/.test(fileName) ? fileName : `${fileName}.json`;
        this._pathFile = path.join('src', 'models', 'fileContext','files',this._file);
        this.init();
    }

    init() {
        if (!existsSync(this._pathFile)) {
            writeFileSync(this._pathFile, JSON.stringify([]));
        }
        return;
    }

    async create(item) {
        try {
            if (!item) {
                throw Error('Insira um item!');
                return false;
            }
            const items = await this.read();
            item['id'] = parseInt((Math.random() * 1001) + 1);
            items.push(item);
            const result = await writeFileAsync(this._pathFile, JSON.stringify(items, ' ', 2));
            return item;
        }
        catch (err) {
            console.log('Error: ', err);
            return;
        }
    }

    async read() {
        try {
            const result = await readFileAsync(this._pathFile, { encoding: 'utf8' });
            return JSON.parse(result);
        }
        catch (err) {
            console.error('Error: ', err);
            return;
        }
    }

    async update(id, item) {
        try{
            if(!item.nome || !item.status){
                throw Error('Item inválido');
                return;
            }
            const items = await this.read();
            const indexItem = items.findIndex(item => item.id === id);
            if(indexItem === -1){
                throw Error('Indice inválido');
                return;
            }
            items[indexItem] = {
                ...item,
                id
            }
            await writeFileAsync(this._pathFile, JSON.stringify(items, ' ', 2));
            return;
        }
        catch(err){
            throw Error(err.message);
        }
    }

    async delete(id) {
        try {
            const items = await this.read();
            const indexItem = items.findIndex(item => item.id === id);
            if(indexItem === -1){
                throw Error('Indice inválido');
                return;
            }
            items.splice(indexItem, 1);
            await writeFileAsync(this._pathFile, JSON.stringify(items, ' ', 2));
            return;
        }
        catch (err) {
            throw Error(err.message);
            return;
        }
    }
}

module.exports = FileContext;

