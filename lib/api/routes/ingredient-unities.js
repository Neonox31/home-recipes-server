// Load dependencies
var Joi = require('joi');
Joi.objectId = require('joi-objectid');

// Local vars
var controller = require("../controllers/ingredient-unities.js");

module.exports = function() {
    return (    
	[

	    /**
	     * GET /api/v1/ingredients/unities/{id?}
	     *
	     * @description
	     *   Get unique ingredient or list
	     *
	     * @return
	     *   200
	     */
	    
	    {
		method: 'GET',
		path: '/api/v1/ingredients/unities/{id?}',
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
	     * POST /api/v1/ingredients/unities
	     *
	     * @description
	     *   Creates a ingredient
	     *
	     * @return
	     *   201
	     */
	    
	    {
		method: 'POST',
		path: '/api/v1/ingredients/unities',
		handler: controller.add,
		config: {
		    validate: {
			payload: {
			    name: Joi.string().trim().min(3).max(200).required()
			}
		    }
		}
	    },
	    
	    /**
	     * PUT /api/v1/ingredients/unities/{id}
	     *
	     * @description
	     *   Update a ingredient
	     *
	     * @return
	     *   200
	     */
	    
	    {
		method: 'PUT',
		path: '/api/v1/ingredients/unities/{id}',
		handler: controller.update,
		config: {
		    validate: {
			params: {
			    id: Joi.objectId()
			},
			payload: {
			    name: Joi.string().trim().min(3).max(200).required()
			}
		    }
		}
	    },
	    
	    /**
	     * DELETE /api/v1/ingredients/unities/{id}
	     *
	     * @description
	     *   Delete a ingredient
	     *
	     * @return
	     *   204
	     */
	    
	    {
		method: 'DELETE',
		path: '/api/v1/ingredients/unities/{id}',
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