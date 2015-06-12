// Load modules
var mongoose = require("mongoose");
var _ = require("lodash");
var Boom = require("boom");

var RecipeDirectionSchema = new mongoose.Schema({
    content: {
        type: String
    },
    order: {
        type: Number,
        index: true
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

RecipeDirectionSchema.statics.get = function (id, recipe_id, cb) {
    // Get an unique recipeDirection
    var errorPrepend = "Get recipeDirection : ";
    if (typeof cb === 'undefined')
        cb = id;
    if (id) {
        this.findOne({_id: id}).populate('ingredient unity').exec(function (err, recipeDirection) {
            if (err)
                return cb(Boom.badImplementation(errorPrepend + err.message));
            if (!recipeDirection) {
                return cb(Boom.notFound(errorPrepend + id + " not found."));
            }
            cb(null, recipeDirection);
        });
    } else {
        // Get recipeDirection list
        this.find({}).populate('ingredient unity').exec(function (err, recipeDirections) {
            if (err)
                return cb(Boom.badImplementation(errorPrepend + err.message));
            cb(null, recipeDirections);
        });
    }
};

RecipeDirectionSchema.statics.add = function (recipe_id, data, cb) {
    // Create recipeDirection
    var errorPrepend = "Create recipeDirection : ";

    // Set recipe from params if not in payload
    if (typeof (data.recipe) === "undefined")
        data = _.extend(data, {recipe: recipe_id});
    // Set default order if !exists
    if (typeof (data.order) === 'undefined')
        data.order = 0;

    var recipeDirection = new RecipeDirection(data);
    var self = this;
    recipeDirection.save(function (err, recipeDirection) {
        if (err)
            return cb(Boom.badImplementation(errorPrepend + err.message));
        self.update({recipe: recipe_id, _id: {$ne: recipeDirection._id}, order: {$gte: recipeDirection.order}}, {$inc: {order: 1}, updated_at: new Date()}, {new : true, multi: true}, function (err) {
            if (err)
                return cb(Boom.badImplementation(errorPrepend + err.message));
            cb(null, recipeDirection);
        });
    });
};

RecipeDirectionSchema.statics.edit = function (id, recipe_id, data, cb) {
    // Get existing recipeDirection and update
    var errorPrepend = "Update recipeDirection : ";
    if (typeof (data.recipe) === "undefined")
        data = _.extend(data, {recipe: recipe_id});
    var self = this;
    this.findOne({_id: id}, function (err, recipeDirection) {
        if (err)
            return cb(Boom.badImplementation(errorPrepend + err.message));
        if (!recipeDirection) {
            return cb(Boom.notFound(errorPrepend + id + " not found."));
        }
        // Update direction data
        self.update({_id: id}, _.extend(data, {updated_at: new Date()}), {new : true}, function (err) {
            if (err)
                return cb(Boom.badImplementation(errorPrepend + err.message));
            // If order has changed, reorg directions
            if (data.order !== recipeDirection.order) {
                self.update({recipe: recipe_id, _id: {$ne: recipeDirection._id}, order: {$gte: data.order}}, {$inc: {order: 1}, updated_at: new Date()}, {new : true, multi: true}, function (err) {
                    if (err)
                        return cb(Boom.badImplementation(errorPrepend + err.message));
                    cb(null, recipeDirection);
                });
            }
        });
    });
};

RecipeDirectionSchema.statics.delete = function (id, recipe_id, cb) {
    // Get existing recipeDirection and delete it
    var errorPrepend = "Delete recipeDirection : ";
    var self = this;
    this.findOne({_id: id}, function (err, recipeDirection) {
        if (err)
            return cb(Boom.badImplementation(errorPrepend + err.message));
        if (!recipeDirection) {
            return cb(Boom.notFound(errorPrepend + id + " not found."));
        }
        var order = recipeDirection.order;
        self.remove({_id: id}, function (err) {
            if (err)
                return cb(Boom.badImplementation(errorPrepend + err.message));
            self.update({recipe: recipe_id, order: {$gt: order}}, {$inc: {order: -1}, updated_at: new Date()}, {new : true, multi: true}, function (err) {
                if (err)
                    return cb(Boom.badImplementation(errorPrepend + err.message));
                cb();
            });
        });
    });
};

var RecipeDirection = mongoose.model('RecipeDirection', RecipeDirectionSchema);

module.exports = {
    RecipeDirection: RecipeDirection
};