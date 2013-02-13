App.Models.Contacts = Backbone.Model.extend({
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