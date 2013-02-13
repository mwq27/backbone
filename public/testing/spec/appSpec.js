/**
 * Global App View initialize method
 */
module('Global App View initialize method');
test('Instantiate the addcontactview', function(){
	var addContactView = new App.Views.AddContact({ collection: [] });

	ok(addContactView, "view isn't null");
});
test('Instantiate the allContactsView', function(){
	var collection = new App.Collections.Contacts;
	var allContactsView;
	collection.fetch().then(function(){
		 allContactsView = new App.Views.Contacts({ collection: collection }).render();
		 ok(allContactsView, "view is not null");
	});	
});
test('appends element to div', function(){
	$('body').append("<div id='allContactsView'/>");
	var container = $("#qunit-fixture");
	container.append("<div>Bam</div>");
	equal( $('div', container).length, 1, "div added");
});

/**
 * Global App View editContact
 */
module('Global App View editContact');
test('Instantiate editContactView', function(){
	var editContactView = new App.Views.EditContact({ model: [] });
	ok(editContactView, "View is not null");
});

/**
 * Contacts Collection tests
 */
module("Contacts Collection", {
	setup: function() {
		this.testCont = new App.Collections.Contacts;
		this.testCont.add(new App.Models.Contacts({ name: "marques" }));
	},
});
test('able to create new contact', function(){
	var curLength = this.testCont.length;	
	this.testCont.create({
		name: "something"
	});
	equal(this.testCont.length, curLength + 1, "Should be true");
});
asyncTest('Connects to the /contacts', function(){
	expect(1);
	$.ajax({
		url: '/contacts',
		dataType: 'json',
		success: function(data){
			ok(data, 'we get something');
			start();
		}
	});
});

/**
 * Contacts View tests
 * 
 */
module('Contacts View');
test("renders a contact", function(){
	var model = new App.Models.Contacts;
	var con = new App.Views.Contact({ model: new App.Models.Contacts({ first_name: 'Marqdizzle', last_name: 'woodson', email_address: 'mmm@m.com'})});
	con.render();
});
