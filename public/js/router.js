App.Router = Backbone.Router.extend({
	routes: {
		'': 'index'

	},

	index: function () {
		// body...
		console.log("this is index page")
	}
});