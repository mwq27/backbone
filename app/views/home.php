<!doctype html>
<html>
<head>
	<title></title>
	<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.0/css/bootstrap-combined.min.css" rel="stylesheet">
</head>
<body>
	<section class="span8">
		
		<h1>Contacts</h1>
		
		<form action="" id="addContact">
			<div>
				<label for="first_name">First name</label>
				<input type="text" name="first_name" id="first_name" />
			</div>
		
			<div>
				<label for="last_name">Last name</label>
				<input type="text" name="last_name" id="last_name" />
			</div>
		
			<div>
				<label for="email_address">Email</label>
				<input type="text" name="email_address" id="email_address" />
			</div>
			
			<div>
				<label for="description">Description</label>
				<textarea  name="description" id="description" ></textarea>
			</div>
		
			<div>
				<input type="submit" value="Add contact" />
			</div>
		
		</form>
		
		<table id="allContacts" class="table table-striped">
			<thead>
				<tr>
					<td>First Name</td>
					<td>Last Name</td>
					<td>Email</td>
					<td>Description</td>
					<td>Config</td>
				</tr>
			</thead>
		</table>
		<div id="editContact" >
			
		</div>
		<script type="text/template" id="allContactsTemplate">
		<td><%= first_name %></td>
		<td><%= last_name %></td>
		<td><%= email_address %></td>
		<td><%= description %></td>
		<td><a href='#contacts/<%= id %>/edit' class="edit"> Edit </a></td>
		<td><a href='#contacts/<%= id %>' class="delete"> Delete </a></td>
		</script>
		
		<script type="text/template" id="editContactTemplate">
		<h1>Edit Contact: <%= first_name %> <%= last_name %> </h1>
		<form action="" id="editContact">
			<div>
				<label for="edit_first_name">First name</label>
				<input type="text" name="edit_first_name" id="edit_first_name" value="<%= first_name %>"/>
			</div>
		
			<div>
				<label for="edit_last_name">Last name</label>
				<input type="text" name="edit_last_name" id="edit_last_name" value="<%= last_name %>" />
			</div>
		
			<div>
				<label for="edit_email_address">Email</label>
				<input type="text" name="edit_email_address" id="edit_email_address"  value="<%= email_address %>"/>
			</div>
			
			<div>
				<label for="edit_description">Description</label>
				<textarea  name="edit_description" id="edit_description" ><%= description %></textarea>
			</div>
		
			<div>
				<input type="submit" value="Edit contact" />
				<button type="button" class="cancel btn">Cancel</button>
			</div>
		
		</form>
		</script>
		
		<script src="http://code.jquery.com/jquery.js"></script>
		<script src="http://underscorejs.org/underscore.js"></script>
		<script src="http://backbonejs.org/backbone.js"></script>
		<script src="js/main.js"></script>
		<script src="js/models.js"></script>
		<script src="js/collections.js"></script>
		<script src="js/views.js"></script>
		<script src="js/router.js"></script>
		
		<script src=""></script>
		
		<script>
		/**
		 * Start up our Router and the history
		 */
		new App.Router;
		Backbone.history.start();
		
		App.contacts = new App.Collections.Contacts;
		//grabs all of the appointments using an AJAX call (fetch)
		App.contacts.fetch().then(function() {
			new App.Views.App({ collection: App.contacts });
		});
		
		</script>
	</section>
</body>
</html>