/** IngredientUnitys controller **/

var IngredientUnity = require("../../models/ingredient-unity").IngredientUnity;

module.exports.get = function (request, reply) {
    IngredientUnity.get(request.params.id, function (err, ingredientUnities) {
        if (err)
            return reply(err);
        // 200 : Success
        reply(ingredientUnities);
    });
};

module.exports.add = function (request, reply) {
    IngredientUnity.add(request.payload, function (err, ingredientUnity) {
        if (err)
            return reply(err);
        // 201 : Created
        reply(ingredientUnity).code(201);
    });
};

module.exports.update = function (request, reply) {
    IngredientUnity.update(request.params.id, request.payload, function (err, ingredientUnity) {
        if (err)
            return reply(err);
        // 200 : Success
        reply(ingredientUnity).code(200);
    });
};

module.exports.delete = function (request, reply) {
    IngredientUnity.delete(request.params.id, function (err) {
        if (err)
            return reply(err);
        // 204 : No content
        reply().code(204);
    });
};
