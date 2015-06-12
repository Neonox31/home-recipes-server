/** recipeTags controller **/

var RecipeTag = require("../../models/recipe-tag").RecipeTag;

module.exports.get = function (request, reply) {
    RecipeTag.get(request.params.id, function (err, recipeTags) {
        if (err)
            return reply(err);
        // 200 : Success
        reply(recipeTags);
    });
};

module.exports.add = function (request, reply) {
    RecipeTag.add(request.payload, function (err, recipeTag) {
        if (err)
            return reply(err);
        // 201 : Created
        reply(recipeTag).code(201);
    });
};

module.exports.update = function (request, reply) {
    RecipeTag.update(request.params.id, request.payload, function (err, recipeTag) {
        if (err)
            return reply(err);
        // 200 : Success
        reply(recipeTag).code(200);
    });
};

module.exports.delete = function (request, reply) {
    RecipeTag.delete(request.params.id, function (err) {
        if (err)
            return reply(err);
        // 204 : No content
        reply().code(204);
    });
};
