// Load dependencies
var Joi = require('joi');
Joi.objectId = require('joi-objectid');

// Local vars
var controller = require("../controllers/recipe-tags.js");

module.exports = function() {
    return (    
	[

	    /**
	     * GET /api/v1/recipes/tags/{id?}
	     *
	     * @description
	     *   Get unique tag or list
	     *
	     * @return
	     *   200
	     */
	    
	    {
		method: 'GET',
		path: '/api/v1/recipes/tags/{id?}',
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
	     * POST /api/v1/recipes/tags
	     *
	     * @description
	     *   Creates a tag
	     *
	     * @return
	     *   201
	     */
	    
	    {
		method: 'POST',
		path: '/api/v1/recipes/tags',
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
	     * PUT /api/v1/recipes/tags/{id}
	     *
	     * @description
	     *   Update a tag
	     *
	     * @return
	     *   200
	     */
	    
	    {
		method: 'PUT',
		path: '/api/v1/recipes/tags/{id}',
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
	     * DELETE /api/v1/recipes/tags/{id}
	     *
	     * @description
	     *   Delete a tag
	     *
	     * @return
	     *   204
	     */
	    
	    {
		method: 'DELETE',
		path: '/api/v1/recipes/tags/{id}',
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