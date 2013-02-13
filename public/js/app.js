Note = Backbone.Model.extend({
	defaults: {
		name: "",
		age: 0
	}
});

var Notes = Backbone.Collection.extend({
	model: Note,
	initialize: function(models, options) {
		this.doc = options.doc;
	},

	url: function() {
		return this.doc.url() + '/notes';
	},
});

var Document = Backbone.Model.extend({
	initialize: function() {
			this.note = new Notes([], {doc: this}); //doc: this refers to the new document we're creating
	},

	addNote: function(text) {
		//create method will save it to the server
		
			this.notes.create({text: text});
		},	
});

var Documents = Backbone.Collection.extend({
	model: Document,
	url: '/documents',
	initialize: function() {
		this.on('reset', this.getNotes, this);
	},

	getNotes: function() {
		this.each(function(doc){
			doc.notes = new Notes([], {doc : doc});
			doc.notes.fetch();
		});
	},
});
