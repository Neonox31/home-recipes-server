/** Ingredients controller **/

var Ingredient = require("../../models/ingredient").Ingredient;

module.exports.get = function (request, reply) {
    Ingredient.get(request.params.id, function (err, ingredients) {
        if (err)
            return reply(err);
        // 200 : Success
        reply(ingredients);
    });
};

module.exports.add = function (request, reply) {
    Ingredient.add(request.payload, function (err, ingredient) {
        if (err)
            return reply(err);
        // 201 : Created
        reply(ingredient).code(201);
    });
};

module.exports.update = function (request, reply) {
    Ingredient.update(request.params.id, request.payload, function (err, ingredient) {
        if (err)
            return reply(err);
        // 200 : Success
        reply(ingredient).code(200);
    });
};

module.exports.delete = function (request, reply) {
    Ingredient.delete(request.params.id, function (err) {
        if (err)
            return reply(err);
        // 204 : No content
        reply().code(204);
    });
};
