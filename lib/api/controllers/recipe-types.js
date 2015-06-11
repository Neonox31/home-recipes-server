/** recipeTypes controller **/

var RecipeType = require("../../models/recipe-type").RecipeType;

module.exports.get = function (request, reply) {
    RecipeType.get(request.params.id, function (err, recipeTypes) {
        if (err)
            return reply(err);
        // 200 : Success
        reply(recipeTypes);
    });
};

module.exports.add = function (request, reply) {
    RecipeType.add(request.payload, function (err, recipeType) {
        if (err)
            return reply(err);
        // 201 : Created
        reply(recipeType).code(201);
    });
};

module.exports.update = function (request, reply) {
    RecipeType.update(request.params.id, request.payload, function (err, recipeType) {
        if (err)
            return reply(err);
        // 200 : Success
        reply(recipeType).code(200);
    });
};

module.exports.delete = function (request, reply) {
    RecipeType.delete(request.params.id, function (err) {
        if (err)
            return reply(err);
        // 204 : No content
        reply().code(204);
    });
};
