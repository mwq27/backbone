App.Collections.Contacts = Backbone.Collection.extend({
	model: App.Models.Contacts,
	/*
		This is the URL for the ajax request (the fetch() method)
	 */
	url: '/contacts'
});