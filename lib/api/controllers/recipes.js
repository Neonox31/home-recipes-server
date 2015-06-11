/** Recipes controller **/

var Recipe = require("../../models/recipe").Recipe;

module.exports.get = function (request, reply) {
    Recipe.get(request.params.id, function (err, recipes) {
        if (err)
            return reply(err);
        // 200 : Success
        reply(recipes);
    });
};

module.exports.add = function (request, reply) {
    Recipe.add(request.payload, function (err, recipe) {
        if (err)
            return reply(err);
        // 201 : Created
        reply(recipe).code(201);
    });
};

module.exports.update = function (request, reply) {
    Recipe.update(request.params.id, request.payload, function (err, recipe) {
        if (err)
            return reply(err);
        // 200 : Success
        reply(recipe).code(200);
    });
};

module.exports.delete = function (request, reply) {
    Recipe.delete(request.params.id, function (err) {
        if (err)
            return reply(err);
        // 204 : No content
        reply().code(204);
    });
};
