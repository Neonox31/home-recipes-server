// Load modules
var mongoose = require("mongoose");
var _ = require("lodash");
var Boom = require("boom");

var RecipeIngredientSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    quantity: {
        type: Number
    },
    unity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'IngredientUnity'
    },
    ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient'
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

RecipeIngredientSchema.statics.get = function (id, cb) {
    // Get an unique recipeIngredient
    var errorPrepend = "Get recipeIngredient : ";
    if (typeof cb === 'undefined')
        cb = id;
    if (id) {
        this.findOne({_id: id}).populate('ingredient unity').exec(function (err, recipeIngredient) {
            if (err)
                return cb(Boom.badImplementation(errorPrepend + err.message));
            if (!recipeIngredient) {
                return cb(Boom.notFound(errorPrepend + id + " not found."));
            }
            cb(null, recipeIngredient);
        });
    } else {
        // Get recipeIngredient list
        this.find({}).populate('ingredient unity').exec(function (err, recipeIngredients) {
            if (err)
                return cb(Boom.badImplementation(errorPrepend + err.message));
            cb(null, recipeIngredients);
        });
    }
};

RecipeIngredientSchema.statics.add = function (data, cb) {
    // Create recipeIngredient
    var errorPrepend = "Create recipeIngredient : ";
    var recipeIngredient = new RecipeIngredient(data);
    recipeIngredient.save(function (err, recipeIngredient) {
        if (err)
            return cb(Boom.badImplementation(errorPrepend + err.message));
        cb(null, recipeIngredient);
    });
};

RecipeIngredientSchema.statics.update = function (id, data, cb) {
    // Get existing recipeIngredient and update
    var errorPrepend = "Update recipeIngredient : ";
    this.findOneAndUpdate({_id: id}, _.extend(data, {updated_at: new Date()}), {new: true}, function (err, recipeIngredient) {
        if (err)
            return cb(Boom.badImplementation(errorPrepend + err.message));
        if (!recipeIngredient) {
            return cb(Boom.notFound(errorPrepend + id + " not found."));
        }
        cb(null, recipeIngredient);
    });
};

RecipeIngredientSchema.statics.delete = function (id, cb) {
    // Get existing recipeIngredient and delete it
    var errorPrepend = "Delete recipeIngredient : ";
    this.findOneAndRemove({_id: id}, function (err) {
        if (err)
            return cb(Boom.badImplementation(errorPrepend + err.message));
        cb();
    });
};

var RecipeIngredient = mongoose.model('RecipeIngredient', RecipeIngredientSchema);

module.exports = {
    RecipeIngredient: RecipeIngredient
};