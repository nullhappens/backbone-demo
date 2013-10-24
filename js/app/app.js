/**
 * Application controller view modified to use requireJS for dependency management.
 * Starts application, inits a new CommentCollection collection, assigns the empty list to 
 * a CommentlistView controller, also inits a NewButtonView instance to handle new comment insertion.
 *
 * @class App
 * @extends Backbone.View
 * @author Bodnar Istvan <istvan@gawker.com>
 */
define([
	'jquery',
	'underscore',
	'backbone',
	'commentcollection',
	'newbuttonview',
	'randombuttonview',
	'listview'	
],function($,_,Backbone,CommentCollection,NewButtonView,RandomButtonView,CommentlistView){    
	var App = Backbone.View.extend({});

	/**
	 * Initialize new application instance
	 */
	var initialize = function () {
		var app = new App({
			el: $('#application')
		});
		// create empty comment collection
		var collection = new CommentCollection();
	
		// bind the NewButtonView to the already rendered 'newcomment' DOM element, we'll need to know the
		// collection to work with so FormView can insert the new comment properly
		new NewButtonView({collection: collection, el: app.$el.find('.newcomment')});
		
		// bind the RandomButtonView to the already rendered 'randomcomment' DOM element
		new RandomButtonView({collection: collection, el: app.$el.find('.randomcomment')});

		// create comment list view, assign our empty collection
		var listview = new CommentlistView({collection: collection, el: app.$el.find('.commentlist')});
		listview.render();
	}

	return {
		initialize: initialize
	};
});


/**
 * Documentation related comments
 */
/**
 * @name Backbone
 * @class Backbone
 * Application is a Backbone based application
 * @link http://documentcloud.github.com/backbone/
 */


/**
 * @name Backbone.Model
 * @class Backbone.Model
 * Backbone model superclass
 * @link http://documentcloud.github.com/backbone/
 */

/**
 * @name Backbone.Collection
 * @class Backbone.Collection
 * Backbone collection superclass
 * @link http://documentcloud.github.com/backbone/
 */

/**
 * @name Backbone.View
 * @class Backbone.View
 * By default all views extend Backbone.View
 * @link http://documentcloud.github.com/backbone/
 */

 