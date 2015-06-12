// Load modules
var mongoose = require("mongoose");
var _ = require("lodash");
var Boom = require("boom");

var RecipeIngredient = require("./recipe-ingredient").RecipeIngredient;
var RecipeDirection = require("./recipe-direction").RecipeDirection;

var RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    tags: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'RecipeTag'}
    ],
//    picture: {
//        
//    },
    make_time: {
        type: Number
    },
    cooking_time: {
        type: Number
    },
    oven_preheat: {
        type: Number
    },
    oven_heat: {
        type: Number
    },
    ingredients: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'RecipeIngredient'}
    ],
    directions: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'RecipeDirection'}
    ],
    views: {
        type: Number
    },
    achievements: {
        type: Number
    },
    grade: {
        type: Number
    },
    level: {
        type: Number
    },
    servings: {
        type: Number  
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

RecipeSchema.statics.get = function (id, cb) {
    // Get an unique recipe
    var errorPrepend = "Get recipe : ";
    if (typeof cb === 'undefined')
        cb = id;
    if (id) {
        this.findOne({_id: id}).populate('ingredients directions tags').exec(function (err, recipe) {
            if (err)
                return cb(Boom.badImplementation(errorPrepend + err.message));
            if (!recipe)
                return cb(Boom.notFound(errorPrepend + id + " not found."));
            cb(null, recipe);
        });
    } else {
        // Get recipe list
        this.find({}).exec(function (err, recipes) {
            if (err)
                return cb(Boom.badImplementation(errorPrepend + err.message));
            cb(null, recipes);
        });
    }
};

RecipeSchema.statics.add = function (data, cb) {
    // Create recipe
    var errorPrepend = "Create recipe : ";
    var recipe = new Recipe(data);
    recipe.save(function (err, recipe) {
        if (err)
            return cb(Boom.badImplementation(errorPrepend + err.message));
        cb(null, recipe);
    });
};

RecipeSchema.statics.update = function (id, data, cb) {
    // Get existing recipe and update
    var errorPrepend = "Update recipe : ";
    this.findOneAndUpdate({_id: id}, _.extend(data, {updated_at: new Date()}), {new : true}, function (err, recipe) {
        if (err)
            return cb(Boom.badImplementation(errorPrepend + err.message));
        if (!recipe) {
            return cb(Boom.notFound(errorPrepend + id + " not found."));
        }
        cb(null, recipe);
    });
};

RecipeSchema.statics.delete = function (id, cb) {
    // Get existing recipe and delete it
    var errorPrepend = "Delete recipe : ";
    this.findOneAndRemove({_id: id}, function (err) {
        if (err)
            return cb(Boom.badImplementation(errorPrepend + err.message));
        cb();
    });
};

// Cascade delete
RecipeSchema.pre('remove', function(next) {
     // 'this' is the recipe being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    RecipeIngredient.remove({recipe: this._id}).exec();
    RecipeDirection.remove({recipe: this._id}).exec();
    next();
});

var Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = {
    Recipe: Recipe
};