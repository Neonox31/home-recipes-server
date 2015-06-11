// Load modules
var mongoose = require("mongoose");
var _ = require("lodash");
var Boom = require("boom");

var IngredientSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

IngredientSchema.statics.get = function (id, cb) {
    // Get an unique ingredient
    var errorPrepend = "Get ingredient : ";
    if (typeof cb === 'undefined')
        cb = id;
    if (id) {
        this.findOne({_id: id}, function (err, ingredient) {
            if (err)
                return cb(Boom.badImplementation(errorPrepend + err.message));
            if (!ingredient) {
                return cb(Boom.notFound(errorPrepend + id + " not found."));
            }
            cb(null, ingredient);
        });
    } else {
        // Get ingredient list
        this.find({}, function (err, ingredients) {
            if (err)
                return cb(Boom.badImplementation(errorPrepend + err.message));
            cb(null, ingredients);
        });
    }
};

IngredientSchema.statics.add = function (data, cb) {
    // Create ingredient
    var errorPrepend = "Create ingredient : ";
    var ingredient = new Ingredient(data);
    ingredient.save(function (err, ingredient) {
        if (err)
            return cb(Boom.badImplementation(errorPrepend + err.message));
        cb(null, ingredient);
    });
};

IngredientSchema.statics.update = function (id, data, cb) {
    // Get existing ingredient and update
    var errorPrepend = "Update ingredient : ";
    this.findOneAndUpdate({_id: id}, _.extend(data, {updated_at: new Date()}), {new: true}, function (err, ingredient) {
        if (err)
            return cb(Boom.badImplementation(errorPrepend + err.message));
        if (!ingredient) {
            return cb(Boom.notFound(errorPrepend + id + " not found."));
        }
        cb(null, ingredient);
    });
};

IngredientSchema.statics.delete = function (id, cb) {
    // Get existing ingredient and delete it
    var errorPrepend = "Delete ingredient : ";
    this.findOneAndRemove({_id: id}, function (err) {
        if (err)
            return cb(Boom.badImplementation(errorPrepend + err.message));
        cb();
    });
};

var Ingredient = mongoose.model('Ingredient', IngredientSchema);

module.exports = {
    Ingredient: Ingredient
};