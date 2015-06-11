// Load modules
var mongoose = require("mongoose");
var _ = require("lodash");
var Boom = require("boom");

var RecipeTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

RecipeTypeSchema.statics.get = function (id, cb) {
    // Get an unique recipeType
    var errorPrepend = "Get recipeType : ";
    if (typeof cb === 'undefined')
        cb = id;
    if (id) {
        this.findOne({_id: id}, function (err, recipeType) {
            if (err)
                return cb(Boom.badImplementation(errorPrepend + err.message));
            if (!recipeType) {
                return cb(Boom.notFound(errorPrepend + id + " not found."));
            }
            cb(null, recipeType);
        });
    } else {
        // Get recipeType list
        this.find({}, function (err, recipeTypes) {
            if (err)
                return cb(Boom.badImplementation(errorPrepend + err.message));
            cb(null, recipeTypes);
        });
    }
};

RecipeTypeSchema.statics.add = function (data, cb) {
    // Create recipeType
    var errorPrepend = "Create recipeType : ";
    var recipeType = new RecipeType(data);
    recipeType.save(function (err, recipeType) {
        if (err)
            return cb(Boom.badImplementation(errorPrepend + err.message));
        cb(null, recipeType);
    });
};

RecipeTypeSchema.statics.update = function (id, data, cb) {
    // Get existing recipeType and update
    var errorPrepend = "Update recipeType : ";
    this.findOneAndUpdate({_id: id}, _.extend(data, {updated_at: new Date()}), {new: true}, function (err, recipeType) {
        if (err)
            return cb(Boom.badImplementation(errorPrepend + err.message));
        if (!recipeType) {
            return cb(Boom.notFound(errorPrepend + id + " not found."));
        }
        cb(null, recipeType);
    });
};

RecipeTypeSchema.statics.delete = function (id, cb) {
    // Get existing recipeType and delete it
    var errorPrepend = "Delete recipeType : ";
    this.findOneAndRemove({_id: id}, function (err) {
        if (err)
            return cb(Boom.badImplementation(errorPrepend + err.message));
        cb();
    });
};

var RecipeType = mongoose.model('RecipeType', RecipeTypeSchema);

module.exports = {
    RecipeType: RecipeType
};