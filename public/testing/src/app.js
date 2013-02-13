window.App = {
	Views: {},
	Models: {},
	Router: {},
	Collections: {}
};

/*
		Make the template function global to all methods
 */
window.template = function(id) 
{
	
	return _.template( $("#" + id).html() );
};

window.vent = _.extend({}, Backbone.Events);

App.Models.Contacts = Backbone.Model.extend({
	defaults: {
		first_name: "defF",
		last_name: "defLast",
		email_address: "mine@macn.com",
		description: "mydescripion",
		id: ""
	},

	validate: function (attrs, options) {
		// body...
		if ( !attrs.first_name || ! attrs.last_name )
		{
			return "A first and last name are required";
		}

		if ( ! attrs.email_address )
		{
			return "Please enter a valid email address";
		}
	}
});


App.Collections.Contacts = Backbone.Collection.extend({
	model: App.Models.Contacts,
	/*
		This is the URL for the ajax request (the fetch() method)
	 */
	url: '/contacts'
});

/**
 * All Contacts View
 */
App.Views.Contacts = Backbone.View.extend({
	tagName: 'tbody',
	initialize: function () {
		// body...
		//this.collection.on('add', this.addOne, this);
	},

	render: function () {
		// body...
		console.log(this)
		this.collection.each( this.addOne, this );
		return this;
	},

	addOne: function (contact) {
		// body...
		var contactView = new App.Views.Contact({model : contact});
		this.$el.append(contactView.render().el);

	}
});

App.Views.App = Backbone.View.extend({
	initialize: function () {
		vent.on('contact:edit', this.editContact, this);		

		var addContactView = new App.Views.AddContact({ collection : App.contacts });

		var allContactsView = new App.Views.Contacts({ collection: App.contacts }).render();
		$("#qunit-fixture").append(allContactsView.el);

	
	},

	editContact: function  (contact) {
		// create new editContactView
		var editContactView = new App.Views.EditContact({ model: contact });
		$("#editContact").html( editContactView.el );
	}
});

/**
 * AddContact View
 * @type {[type]}
 */
App.Views.AddContact = Backbone.View.extend({
	//reference the element already in the DOM
	el: "#addContact", // the form id on home.php

	initialize: function () {
		// body...
		this.first_name = $("#first_name");
		this.last_name = $("#last_name");
		this.email_address = $("#email_address");
		this.description = $("#description");

	},
	events: {
		'submit': 'addContact'
	},

	addContact: function(e) {
		e.preventDefault();

		//create new contact in collection
		var newContact = this.collection.create({
			first_name: this.first_name.val(), // same as this.$el.find('#first_name')
			last_name: this.last_name.val(),
			email_address: this.email_address.val(),
			description: this.description.val()
		}, { wait: true , validate: true});
		this.clearForm();
		//this.collection.add(newContact);
	},

	deleteContact: function () {
		// body...
		
	},

	clearForm: function () {
		// body...
		this.first_name.val("");
		this.last_name.val("");
		this.email_address.val("");
		this.description.val("");
	}

});



/**
 * Single Contact View
 */
App.Views.Contact = Backbone.View.extend({
	tagName: 'tr',

	/**
	 * Add event handlers for each row in the table, each contact
	 * @type {Object}
	 */
	events: {
		"click a.delete": "deleteContact",
		"click a.edit": "editContact",

	},	

	template: template('allContactsTemplate'),

	initialize: function  () {
		// body...
		//this.model.on('destroy', this.unrender, this);
		//this.model.on('change', this.render, this);
	},

	editContact: function  () {
		vent.trigger('contact:edit', this.model);
		
		// bind the model
		// append the form to the dom
	},

	deleteContact: function () {
		// body...
		this.model.destroy();
	},

	render: function () {
		// body...
		this.$el.html(this.template( this.model.toJSON() ));
		return this;
	},

	unrender: function () {
		// body...
		this.remove();
	}
});

App.Views.EditContact = Backbone.View.extend({
	
});
