/**
 * Comment form controller and view implemented as a requirejs singleton for reusing the form throughout.
 *
 * @class FormView
 * @extends Backbone.View
 * @author Bodnar Istvan <istvan@gawker.com>
 */
define([
	'jquery',
	'underscore',
	'backbone',
	'mustache',
	'commentmodel'
],function($,_,Backbone,Mustache,CommentModel){
	var FormView = Backbone.View.extend(
	/** @lends FormView.prototype */
		{
			/**
			 * Html tag name of the container element that'll be created when initializing new instance.
			 * This container is then accessible via the this.el (native DOM node) or this.$el (jQuery node)
			 * variables.
			 * @type String
			 */
			tagName: 'div',
		
			/**
			 * CSS class name of the container element
			 * @type String
			 */
			className: 'commentform',
			
			/**
			 * The map of delegated event handlers
			 * @type Object
			 */
			events: {
				'click .submit': 'submit',
				'click .cancel': 'cancel'
			},
			
			/**
			 * View init method
			 */
			initialize: function () {
				
			},
			/**
			 * View bind events method.  Binds to the model events as well as the jquery events setup in 
			 * this.events
			 */
			bindEvents: function(){
				this.model.on('change', this.updateFields, this);
				this.model.on('destroy', this.remove, this);
				this.delegateEvents(this.events);
			},			
			/**
			 * Render form element from a template using Mustache
			 * @returns {FormView} Returns the view instance itself, to allow chaining view commands.
			 */
			render: function () {
				//keep track if form is rendered
				this._rendered = true;

				var template = $('#form-template').text();
				var template_vars = {
					author: this.model.get('author'),
					text: this.model.get('text')
				};
				this.$el.html(Mustache.to_html(template, template_vars));
				return this;
			},
		
			/**
			 * Submit button click handler
			 * Sets new values from form on model, triggers a success event and cleans up the form
			 * @returns {Boolean} Returns false to stop propagation
			 */
			submit: function () {
				// set values from form on model
				this.model.set({
					author: this.$el.find('.author').val(),
					text: this.$el.find('.text').val()
				});
				
				// set an id if model was a new instance
				// note: this is usually done automatically when items are stored in an API
				if (this.model.isNew()) {
					this.model.id = Math.floor(Math.random() * 1000);
				}
				
				// trigger the 'success' event on form, with the returned model as the only parameter
				this.trigger('success', this.model);
				
				// remove form view from DOM and memory
				this.remove();
				return false;
			},
			
			/**
			* Cancel button click handler
			* Validates if text on form has changed, and if so, prompts the user for confirmation
			* If user confirms or if we are creating a new comment (the model is new) cleans up form view 
			* from the DOM.
			* @returns {Boolean} Returns false to stop propagation
			*/
			cancel: function () {
				//if we are creating a brand new comment we can safely avoid prompting for confirmation
				if(this.model.isNew()){
					this.remove();
					return false;
				}				
				//set confirmation to true by default
				var confirmation = true;
				//check if DOM value is different from stored model value, if so prompt for confirmation
				if(this.model.get('text') != this.$el.find('.text').val()){
					//ask for verification 
					confirmation = confirm('Are you sure you want to discard your changes?')				
				}
				
				if(confirmation){
					// clean up form
					this.remove();
				}
				return false;
			},
			
			/**
			 * Update view if the model changes, helps keep two edit forms for the same model in sync
			 * @returns {Boolean} Returns false to stop propagation
			 */
			updateFields: function () {
				this.$el.find('.author').val(this.model.get('author'));
				this.$el.find('.text').val(this.model.get('text'));
				return false;
			},
			
			/**
			 * Remove the form from the DOM
			 */
			remove: function () {
				//keep track if form is rendered
				this._rendered = false;
				this.$el.remove();
			},
			/**
			 * Reset singleton model, clear all 'success' events. rebind events
			 */
			resetInstance: function(model){
				this.model = model;
				this.off('success');
				this.delegateEvents();
			}
		}
	);
	
	//requirejs will return and manage a single instance of this module when loading.
	return new FormView();
});