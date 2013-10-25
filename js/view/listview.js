/**
 * Comment list controller and view
 * Subscribes to comment collection events and renders a list of comments according
 *
 * @class CommentlistView
 * @extends Backbone.View
 * @author Bodnar Istvan <istvan@gawker.com>
 */
define([
	'jquery',
	'underscore',
	'backbone',
	'commentview',
],function($,_,Backbone,CommentView){ 
	var CommentlistView = Backbone.View.extend(
	/** @lends CommentlistView.prototype */
		{
			/**
			 * Subscribe to add and delete events from model collection
			 * Initialize a collection that holds CommentViews (1 per model in collection)
			 */
			initialize: function () {
    			// bind the functions 'add' to view
    			_(this).bindAll('add');

    			// bind this view to the add and remove events of the collection
        		this.collection.bind('add', this.add,this);

				// we will hold a collection of CommentViews to handle rendering
				this._commentViewList = [];

				// for each model we add a CommentView into our commentListView collection
    			this.collection.each(this.add);
			},
			/**
			 * This method is called whenever our collection has an element added. Adds a new CommentView
			 * to the commentViewList and renders it appropriately delegating to its render method.
			 */
			add: function(item){
				// create new CommentView instance
				var commentView = new CommentView({
					model: item
				});

				//Push instance into commentViewList
				this._commentViewList.push(commentView);

				// Handle rendering
				if(this._rendered){
					this.$el.append(commentView.render().el);
				}				
			},
			/**
			 * Render comments stored in commentViewList
			 */
			render: function () {
				// keep track if the view is rendered
				this._rendered = true;
				
				// first clean up the container
				this.$el.empty();
				
				_this = this;
				// iterate over collection of views and delegate rendering to each view				
				_(this._commentViewList).each(function(view){

					//append rendered commentView to DOM
					_this.$el.append(view.render().el);
				});

				return this;
			}
		}
	);

	return CommentlistView;
});