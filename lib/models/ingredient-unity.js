// Load modules
var mongoose = require("mongoose");
var _ = require("lodash");
var Boom = require("boom");

var IngredientUnitySchema = new mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

IngredientUnitySchema.statics.get = function (id, cb) {
    // Get an unique ingredientUnity
    var errorPrepend = "Get ingredientUnity : ";
    if (typeof cb === 'undefined')
        cb = id;
    if (id) {
        this.findOne({_id: id}, function (err, ingredientUnity) {
            if (err)
                return cb(Boom.badImplementation(errorPrepend + err.message));
            if (!ingredientUnity) {
                return cb(Boom.notFound(errorPrepend + id + " not found."));
            }
            cb(null, ingredientUnity);
        });
    } else {
        // Get ingredientUnity list
        this.find({}, function (err, ingredientUnities) {
            if (err)
                return cb(Boom.badImplementation(errorPrepend + err.message));
            cb(null, ingredientUnities);
        });
    }
};

IngredientUnitySchema.statics.add = function (data, cb) {
    // Create ingredientUnity
    var errorPrepend = "Create ingredientUnity : ";
    var ingredientUnity = new IngredientUnity(data);
    ingredientUnity.save(function (err, ingredientUnity) {
        if (err)
            return cb(Boom.badImplementation(errorPrepend + err.message));
        cb(null, ingredientUnity);
    });
};

IngredientUnitySchema.statics.update = function (id, data, cb) {
    // Get existing ingredientUnity and update
    var errorPrepend = "Update ingredientUnity : ";
    this.findOneAndUpdate({_id: id}, _.extend(data, {updated_at: new Date()}), {new: true}, function (err, ingredientUnity) {
        if (err)
            return cb(Boom.badImplementation(errorPrepend + err.message));
        if (!ingredientUnity) {
            return cb(Boom.notFound(errorPrepend + id + " not found."));
        }
        cb(null, ingredientUnity);
    });
};

IngredientUnitySchema.statics.delete = function (id, cb) {
    // Get existing ingredientUnity and delete it
    var errorPrepend = "Delete ingredientUnity : ";
    this.findOneAndRemove({_id: id}, function (err) {
        if (err)
            return cb(Boom.badImplementation(errorPrepend + err.message));
        cb();
    });
};

var IngredientUnity = mongoose.model('IngredientUnity', IngredientUnitySchema);

module.exports = {
    IngredientUnity: IngredientUnity
};