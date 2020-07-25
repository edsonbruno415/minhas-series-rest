const IContext = require('./interfaces/IContext');

class Context extends IContext{
    constructor( database ){
        super();
        this._database = database;
    }

    create(item){
        return this._database.create(item);
    }

    read(){
        return this._database.read();
    }

    update(id, item){
        return this._database.update(id, item);
    }

    delete(id){
        return this._database.delete(id);
    }
}

module.exports = Context;