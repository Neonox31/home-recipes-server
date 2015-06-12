// Load modules
var mongoose = require("mongoose");
var _ = require("lodash");
var Boom = require("boom");

var RecipeTagSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

RecipeTagSchema.statics.get = function (id, cb) {
    // Get an unique recipeTag
    var errorPrepend = "Get recipeTag : ";
    if (typeof cb === 'undefined')
        cb = id;
    if (id) {
        this.findOne({_id: id}, function (err, recipeTag) {
            if (err)
                return cb(Boom.badImplementation(errorPrepend + err.message));
            if (!recipeTag) {
                return cb(Boom.notFound(errorPrepend + id + " not found."));
            }
            cb(null, recipeTag);
        });
    } else {
        // Get recipeTag list
        this.find({}, function (err, recipeTags) {
            if (err)
                return cb(Boom.badImplementation(errorPrepend + err.message));
            cb(null, recipeTags);
        });
    }
};

RecipeTagSchema.statics.add = function (data, cb) {
    // Create recipeTag
    var errorPrepend = "Create recipeTag : ";
    var recipeTag = new RecipeTag(data);
    recipeTag.save(function (err, recipeTag) {
        if (err)
            return cb(Boom.badImplementation(errorPrepend + err.message));
        cb(null, recipeTag);
    });
};

RecipeTagSchema.statics.update = function (id, data, cb) {
    // Get existing recipeTag and update
    var errorPrepend = "Update recipeTag : ";
    this.findOneAndUpdate({_id: id}, _.extend(data, {updated_at: new Date()}), {new: true}, function (err, recipeTag) {
        if (err)
            return cb(Boom.badImplementation(errorPrepend + err.message));
        if (!recipeTag) {
            return cb(Boom.notFound(errorPrepend + id + " not found."));
        }
        cb(null, recipeTag);
    });
};

RecipeTagSchema.statics.delete = function (id, cb) {
    // Get existing recipeTag and delete it
    var errorPrepend = "Delete recipeTag : ";
    this.findOneAndRemove({_id: id}, function (err) {
        if (err)
            return cb(Boom.badImplementation(errorPrepend + err.message));
        cb();
    });
};

var RecipeTag = mongoose.model('RecipeTag', RecipeTagSchema);

module.exports = {
    RecipeTag: RecipeTag
};