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
 * EditContact View
 * @type {[type]}
 */
App.Views.EditContact = Backbone.View.extend({
	className: 'well',
	template: template('editContactTemplate'),

	initialize: function () {
		// body...
		this.render();
		this.form = this.$('form');
		this.first_name = this.form.find('#edit_first_name');
		this.last_name = this.form.find('#edit_last_name');
		this.email_address = this.form.find('#edit_email_address');
		this.description = this.form.find('#edit_description');

	},

	events: {
		'submit form': 'submit',
		'click button.cancel': 'cancel'
	},

	submit: function (e) {
		e.preventDefault();
		//grab the related model. 
		this.model.save({ // will fire a change event, then a sync event
			first_name: this.first_name.val(),
			last_name: this.last_name.val(),
			email_address: this.email_address.val(),
			description: this.description.val()
		});
		
		this.remove();
		//update its attributes. We could use .set or .save, .save is better
		
		//sync
	},

	cancel: function () {
		// body...
		this.remove();
	},

	render: function () {
		// body...
		var html = this.template( this.model.toJSON() );
		this.$el.html(html); // $el in this case is the default 'div'

		return this;
	}
});




/**
 * All Contacts View
 */
App.Views.Contacts = Backbone.View.extend({
	tagName: 'tbody',
	initialize: function () {
		// body...
		this.collection.on('add', this.addOne, this);
	},

	render: function () {
		// body...
		this.collection.each( this.addOne, this );
		return this;
	},

	addOne: function (contact) {
		// body...
		var contactView = new App.Views.Contact({model : contact});
		this.$el.append(contactView.render().el);

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
		this.model.on('destroy', this.unrender, this);
		this.model.on('change', this.render, this);
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

/**
 * Global App View
 * @type {[type]}
 */
App.Views.App = Backbone.View.extend({
	initialize: function () {
		vent.on('contact:edit', this.editContact, this);
		console.log(App)
		

		var addContactView = new App.Views.AddContact({ collection : App.contacts });

		var allContactsView = new App.Views.Contacts({ collection: App.contacts }).render();
		$("#allContacts").append(allContactsView.el);

	
	},

	editContact: function  (contact) {
		// create new editContactView
		var editContactView = new App.Views.EditContact({ model: contact });
		$("#editContact").html( editContactView.el );
	}
});