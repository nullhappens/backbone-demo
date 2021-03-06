/**
 * New comment creation button
 *
 * @class NewButtonView
 * @extends Backbone.View
 * @author Bodnar Istvan <istvan@gawker.com>
 */
define([
	'jquery',
	'underscore',
	'backbone',
	'formview',
	'commentmodel'
],function($,_,Backbone,FormView,CommentModel){
	var NewButtonView = Backbone.View.extend(
	/** @lends NewButtonView.prototype */
		{
			/**
			 * The map of delegated event handlers
			 * @type Object
			 */
			events: {
				'click': 'createComment'
			},
			
			/**
			 * Initialize view, make sure button has a comment collection to work with
			 */
			initialize: function () {
				if (this.collection === undefined) {
					throw 'NoCollectionDefined';
				}
			},
			
			/**
			 * Click event handler that first creates a new empty comment model, and assigns the model to a FormView instance.
			 * FormView will handle internally new comment creation and existing comment editing.
			 * @returns {Boolean} Returns false to stop propagation
			 */
			createComment: function () {
				// create new comment model
				var comment = new CommentModel({});
			
				
				// request and reset instance of the FormView singleton
				FormView.resetInstance(comment);
				
				// insert FormView instance after the comment container 
				this.$el.after(FormView.render().$el); 
				// add saved model to collection after form was submitted successfully
				FormView.on('success', this.handleFormSuccess, this);
			
				// finally, return false to stop event propagation
				return false;
			},
			
			/**
			 * Method to handle FormView success event
			 * @param {CommentModel} model Model data returned by FormViews save request
			 */
			handleFormSuccess: function (model) {
				this.collection.add(model);
			}
		
		}
	);
	return NewButtonView;
});