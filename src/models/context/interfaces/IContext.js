class NotImplementedException extends Error {
    constructor() {
        super("Not Implemented Exception");
    }
}
class IContext {
    create(item) {
        throw new NotImplementedException();
    }

    read() {
        throw new NotImplementedException();
    }

    update(id, item) {
        throw new NotImplementedException();
    }

    delete(id) {
        throw new NotImplementedException();
    }
}

module.exports = IContext;