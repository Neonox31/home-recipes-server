/** recipeIngredients controller **/

var RecipeIngredient = require("../../models/recipe-ingredient").RecipeIngredient;

module.exports.get = function (request, reply) {
    RecipeIngredient.get(request.params.id, function (err, recipeIngredients) {
        if (err)
            return reply(err);
        // 200 : Success
        reply(recipeIngredients);
    });
};

module.exports.add = function (request, reply) {
    RecipeIngredient.add(request.payload, function (err, recipeIngredient) {
        if (err)
            return reply(err);
        // 201 : Created
        reply(recipeIngredient).code(201);
    });
};

module.exports.update = function (request, reply) {
    RecipeIngredient.update(request.params.id, request.payload, function (err, recipeIngredient) {
        if (err)
            return reply(err);
        // 200 : Success
        reply(recipeIngredient).code(200);
    });
};

module.exports.delete = function (request, reply) {
    RecipeIngredient.delete(request.params.id, function (err) {
        if (err)
            return reply(err);
        // 204 : No content
        reply().code(204);
    });
};
