(function(){
	window.App = {
		Models: {},
		Views: {},
		Collections: {},
		Router: {}
	};

	/*
		Make the template function global to all methods
	 */
	window.template = function(id) 
	{
		return _.template( $("#" + id).html() );
	};

	window.vent = _.extend({}, Backbone.Events);
})();