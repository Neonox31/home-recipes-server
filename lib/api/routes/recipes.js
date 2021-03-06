// Load dependencies
var Joi = require('joi');
Joi.objectId = require('joi-objectid');

// Local vars
var controller = require("../controllers/recipes.js");

module.exports = function () {
    return (
            [
                /**
                 * GET /api/v1/recipes/{id?}
                 *
                 * @description
                 *   Get unique recipe or list
                 *
                 * @return
                 *   200
                 */

                {
                    method: 'GET',
                    path: '/api/v1/recipes/{id?}',
                    handler: controller.get,
                    config: {
                        validate: {
                            params: {
                                id: Joi.objectId()
                            }
                        }
                    }
                },
                /**
                 * POST /api/v1/recipes
                 *
                 * @description
                 *   Creates a recipe
                 *
                 * @return
                 *   201
                 */

                {
                    method: 'POST',
                    path: '/api/v1/recipes',
                    handler: controller.add,
                    config: {
                        validate: {
                            payload: {
                                name: Joi.string().trim().min(3).max(200).required(),
                                tags: Joi.array().required(),
                                make_time: Joi.number().min(1).max(1440).required(),
                                cooking_time: Joi.number().min(1).max(1440),
                                oven_preheat: Joi.number().min(1).max(1440),
                                oven_heat: Joi.number().min(1).max(1440),
                                directions: Joi.array().items(Joi.objectId()),
                                ingredients: Joi.array().items(Joi.objectId()),
                                level: Joi.number().min(1).max(5),
                                servings: Joi.number().required()
                            }
                        }
                    }
                },
                /**
                 * PUT /api/v1/recipes/{id}
                 *
                 * @description
                 *   Update a recipe
                 *
                 * @return
                 *   200
                 */

                {
                    method: 'PUT',
                    path: '/api/v1/recipes/{id}',
                    handler: controller.update,
                    config: {
                        validate: {
                            params: {
                                id: Joi.objectId()
                            },
                            payload: {
                                name: Joi.string().trim().min(3).max(200),
                                tags: Joi.array(),
                                make_time: Joi.number().min(1).max(1440),
                                cooking_time: Joi.number().min(1).max(1440),
                                oven_preheat: Joi.number().min(1).max(1440),
                                oven_heat: Joi.number().min(1).max(1440),
                                directions: Joi.array().items(Joi.objectId()),
                                ingredients: Joi.array().items(Joi.objectId()),
                                level: Joi.number().min(1).max(5),
                                views: Joi.number(),
                                achievements: Joi.number(),
                                grade: Joi.number(),
                                servings: Joi.number()
                            }
                        }
                    }
                },
                /**
                 * DELETE /api/v1/recipes/{id}
                 *
                 * @description
                 *   Delete a recipe
                 *
                 * @return
                 *   204
                 */

                {
                    method: 'DELETE',
                    path: '/api/v1/recipes/{id}',
                    handler: controller.delete,
                    config: {
                        validate: {
                            params: {
                                id: Joi.objectId()
                            }
                        }
                    }
                }

            ]
            );
};