// Load dependencies
var Joi = require('joi');
Joi.objectId = require('joi-objectid');

// Local vars
var controller = require("../controllers/recipe-directions.js");

module.exports = function () {
    return (
            [
                /**
                 * GET /api/v1/recipes/{recipe_id}/directions/{id?}
                 *
                 * @description
                 *   Get unique direction or list
                 *
                 * @return
                 *   200
                 */

                {
                    method: 'GET',
                    path: '/api/v1/recipes/{recipe_id}/directions/{id?}',
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
                 * POST /api/v1/recipes/{recipe_id}/directions
                 *
                 * @description
                 *   Creates a direction
                 *
                 * @return
                 *   201
                 */

                {
                    method: 'POST',
                    path: '/api/v1/recipes/{recipe_id}/directions',
                    handler: controller.add,
                    config: {
                        validate: {
                            params: {
                                recipe_id: Joi.objectId()
                            },
                            payload: {
                                recipe: Joi.objectId(),
                                content: Joi.string().required(),
                                order: Joi.number()
                            }
                        }
                    }
                },
                /**
                 * PUT /api/v1/recipes/{recipe_id}/directions/{id}
                 *
                 * @description
                 *   Update a direction
                 *
                 * @return
                 *   200
                 */

                {
                    method: 'PUT',
                    path: '/api/v1/recipes/{recipe_id}/directions/{id}',
                    handler: controller.update,
                    config: {
                        validate: {
                            params: {
                                recipe_id: Joi.objectId(),
                                id: Joi.objectId()
                            },
                            payload: {
                                recipe: Joi.objectId(),
                                content: Joi.string().required(),
                                order: Joi.number()
                            }
                        }
                    }
                },
                /**
                 * DELETE /api/v1/recipes/{recipe_id}/directions/{id}
                 *
                 * @description
                 *   Delete a direction
                 *
                 * @return
                 *   204
                 */

                {
                    method: 'DELETE',
                    path: '/api/v1/recipes/{recipe_id}/directions/{id}',
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