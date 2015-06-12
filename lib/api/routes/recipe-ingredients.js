// Load dependencies
var Joi = require('joi');
Joi.objectId = require('joi-objectid');

// Local vars
var controller = require("../controllers/recipe-ingredients.js");

module.exports = function () {
    return (
            [
                /**
                 * GET /api/v1/recipes/{recipe_id}/ingredients/{id?}
                 *
                 * @description
                 *   Get unique ingredient or list
                 *
                 * @return
                 *   200
                 */

                {
                    method: 'GET',
                    path: '/api/v1/recipes/{recipe_id}/ingredients/{id?}',
                    handler: controller.get,
                    config: {
                        validate: {
                            params: {
                                recipe_id: Joi.objectId(),
                                id: Joi.objectId()
                            }
                        }
                    }
                },
                /**
                 * POST /api/v1/recipes/{recipe_id}/ingredients
                 *
                 * @description
                 *   Creates a ingredient
                 *
                 * @return
                 *   201
                 */

                {
                    method: 'POST',
                    path: '/api/v1/recipes/{recipe_id}/ingredients',
                    handler: controller.add,
                    config: {
                        validate: {
                            params: {
                                recipe_id: Joi.objectId()
                            },
                            payload: {
                                ingredient: Joi.objectId().required(),
                                quantity: Joi.number().required(),
                                recipe: Joi.objectId(),
                                unity: Joi.objectId()
                            }
                        }
                    }
                },
                /**
                 * PUT /api/v1/recipes/{recipe_id}/ingredients/{id}
                 *
                 * @description
                 *   Update a ingredient
                 *
                 * @return
                 *   200
                 */

                {
                    method: 'PUT',
                    path: '/api/v1/recipes/{recipe_id}/ingredients/{id}',
                    handler: controller.update,
                    config: {
                        validate: {
                            params: {
                                recipe_id: Joi.objectId(),
                                id: Joi.objectId()
                            },
                            payload: {
                                ingredient: Joi.objectId().required(),
                                quantity: Joi.number().required(),
                                recipe: Joi.objectId(),
                                unity: Joi.objectId()
                            }
                        }
                    }
                },
                /**
                 * DELETE /api/v1/recipes/{recipe_id}/ingredients/{id}
                 *
                 * @description
                 *   Delete a ingredient
                 *
                 * @return
                 *   204
                 */

                {
                    method: 'DELETE',
                    path: '/api/v1/recipes/{recipe_id}/ingredients/{id}',
                    handler: controller.delete,
                    config: {
                        validate: {
                            params: {
                                recipe_id: Joi.objectId(),
                                id: Joi.objectId()
                            }
                        }
                    }
                }

            ]
            );
};