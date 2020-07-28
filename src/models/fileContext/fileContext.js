const IContext = require('../context/interfaces/IContext');
const path = require('path');
const {
    readFile,
    writeFile,
    exists
} = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);
const existsAsync = promisify(exists);

const Serie = require('../validator/serie');

class FileContext extends IContext {
    constructor(fileName) {
        super();
        this._file = /\.json$/.test(fileName) ? fileName : `${fileName}.json`;
        this._pathFile = path.join('src', 'models', 'fileContext', 'files', this._file);
    }

    async createIfnotExists() {
        const alreadyExists = await existsAsync(this._pathFile);
        if (!alreadyExists) {
            await writeFileAsync(this._pathFile, JSON.stringify([], ' ', 2));
        }
        return;
    }

    async create(item) {
        try {
            const serie = new Serie(item);
            const series = await this.read();
            serie['id'] = parseInt((Math.random() * 1001) + 1);
            series.unshift(serie);
            await writeFileAsync(this._pathFile, JSON.stringify(series, ' ', 2));
            return serie;
        }
        catch (error) {
            throw Error(error.message);
        }
    }

    async read() {
        try {
            await this.createIfnotExists();
            const series = await readFileAsync(this._pathFile, { encoding: 'utf8' });
            return JSON.parse(series);
        }
        catch (error) {
            throw Error(error.message);
        }
    }

    async update(id, item) {
        try {
            const serie = new Serie(item);
            const series = await this.read();
            const indexserie = series.findIndex(serie => serie.id === id);
            if (indexserie === -1) {
                throw Error('Indice inválido');
            }
            const updatedSerie = {
                ...serie,
                id
            }
            series[indexserie] = updatedSerie;
            await writeFileAsync(this._pathFile, JSON.stringify(series, ' ', 2));
            return updatedSerie;
        }
        catch (error) {
            throw Error(error.message);
        }
    }

    async delete(id) {
        try {
            const series = await this.read();
            const indexserie = series.findIndex(serie => serie.id === id);
            if (indexserie === -1) {
                throw Error('Indice inválido');
            }
            series.splice(indexserie, 1);
            await writeFileAsync(this._pathFile, JSON.stringify(series, ' ', 2));
            return;
        }
        catch (error) {
            throw Error(error.message);
        }
    }
}

module.exports = FileContext;

