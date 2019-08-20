var mongoose = require('mongoose');
class ViewSets {
    constructor(model) {
        this.model_name = model;
        this.model = mongoose.model(this.model_name);
    }

    insert(args) {
        return this.model
            .create(args)
    }

    listAll() {
        return this.model
            .find({})
    }

    retrieve(id) {
        return this.model
            .findById(id)
    }

    update(id, args) {
        return this.model
            .findByIdAndUpdate(id, args, { new: true })
    }

    delete(id) {
        return this.model
            .findByIdAndDelete(id)
    }
}

exports.ViewSets = ViewSets;