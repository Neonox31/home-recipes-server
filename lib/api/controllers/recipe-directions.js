/** recipeIngredients controller **/

var RecipeDirection = require("../../models/recipe-direction").RecipeDirection;

module.exports.get = function (request, reply) {
    RecipeDirection.get(request.params.id, request.params.recipe_id, function (err, recipeIngredients) {
        if (err)
            return reply(err);
        // 200 : Success
        reply(recipeIngredients);
    });
};

module.exports.add = function (request, reply) {
    RecipeDirection.add(request.params.recipe_id, request.payload, function (err, recipeIngredient) {
        if (err)
            return reply(err);
        // 201 : Created
        reply(recipeIngredient).code(201);
    });
};

module.exports.update = function (request, reply) {
    RecipeDirection.edit(request.params.id, request.params.recipe_id, request.payload, function (err, recipeIngredient) {
        if (err)
            return reply(err);
        // 200 : Success
        reply(recipeIngredient).code(200);
    });
};

module.exports.delete = function (request, reply) {
    RecipeDirection.delete(request.params.id, request.params.recipe_id, function (err) {
        if (err)
            return reply(err);
        // 204 : No content
        reply().code(204);
    });
};
