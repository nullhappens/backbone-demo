/**
 * Application entry point using requireJS to load up and define dependencies.
 * Both backbone and underscore are not AMD enabled by default.  These files have been replaced by AMD
 * compatible implementations found here https://github.com/amdjs
 *
 * Sets up aliases to all possible files that can be required by the application to enable shorthand requires
 * in subsequent files
 */

requirejs.config({
	//by default libraries will be looked up in the js/lib folder
    baseUrl: 'js/lib',
    paths: {
    	//vendor libraries
        jquery: 'jquery',
        underscore: 'underscore',
        backbone: 'backbone',
        mustache: 'mustache',
        //Main application
        app: '../app/app',
        //Models
        commentcollection: '../model/commentcollection',
		commentmodel: '../model/commentmodel',
		//Views
		commentview: '../view/commentview',
		formview: '../view/formview',
		listview: '../view/listview',
		newbuttonview: '../view/newbuttonview',
		randombuttonview: '../view/randombuttonview',
        //fixtures
        sampleData: '../fixtures/sampleData'
    }
});

//Bootstrap our application
require(['app'], function(App){
	App.initialize();
});