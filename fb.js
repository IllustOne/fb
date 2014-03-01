/*
 * Angular Module for facebook-jssdk
 * @author Bryan Brown
 */

/*global angular*/
(function(angular){
	'use strict';
	
	/**
	 * @ngdoc module
	 * @name fb
	 * @module fb
	 * @description
	 * Angular Module for facebook-jssdk
	 * If there is not an element with the id facebook-jssdk then the facebook API will be loaded onto the page.
	 */
	var fb = angular.module('fb', []);
	
	/**
	 * @ngdoc directive
	 * @name fbLikeBox
	 * @module fb
	 * @scope
	 * @restrict EA
	 * 
	 * @param {string} appId the id for the facebook application.  Currently only one appId per angular application.
	 * @param {string} colorscheme The color scheme used by the plugin. Can be "light" or "dark".
	 * @param (boolean) header Specifies whether to display the Facebook header at the top of the plugin.
	 * @param {number} The height of the plugin in pixels. The default height varies based on number of faces to display, and whether the stream is displayed. With stream set to true and 10 photos displayed (via show_faces) the default height is 556px. With stream and show_faces both false, the default height is 63px.
	 * @param {string} href The absolute URL of the Facebook Page that will be liked. This is a required setting.
	 * @param {boolean} showBorder Specifies whether or not to show a border around the plugin.
	 * @param {boolean} showFaces Specifies whether to display profile photos of people who like the page.
	 * @param {boolean} stream Specifies whether to display a stream of the latest posts by the Page.
	 * @param {number} width The width of the plugin in pixels. Minimum is 292.
	 * 
	 * @element ANY
	 * @description
	 * Angular Module for facebook-jssdk
	 * Param descriptions from: https://developers.facebook.com/docs/plugins/like-box-for-pages
	 */
	fb.directive('fbLikeBox', function(){
		var initialize = function(appId){
				var initJSON = {
						xfbml: false
					};
				if(appId)
				{
					initJSON.appId = appId;
				}
				window.FB.init(initJSON);
				initialize = angular.noop;
			},
			parse = function(element){
				setTimeout(function(){
					window.FB.XFBML.parse(element);
				}, 0);
			},
			directiveDefinition = {
				restrict: 'EA',
				scope: {
					appId: '@',
					height: '@',
					width: '@',
					href: '@',
					colorscheme: '@',
					showFaces: '@',
					header: '@',
					stream: '@',
					showBorder: '@'
				},
				template: '<div class="fb-like-box" data-href="{{href}}" data-colorscheme="{{colorscheme}}" data-height="{{height}}" data-width="{{width}}"' +
					'data-show-faces="{{showFaces}}" data-header="{{header}}" data-stream="{{stream}}" data-show-border="{{showBorder}}"></div>',
				link: function(scope, iElement){
					initialize(scope.appId);
					parse(iElement[0]);
				}
			};
		
		return directiveDefinition;
	});
	
	//Add the Facebook SDK to to page.  Consider adding an onload listener if there are timing issues.
	fb.run(function(){
		var d = document,
			s = 'script',
			id = 'facebook-jssdk',
			js,
			fjs = d.getElementsByTagName(s)[0];
		if (!d.getElementById(id) && !window.FB)
		{
			js = d.createElement(s);
			js.id = id;
			js.src = '//connect.facebook.net/en_US/all.js';
			fjs.parentNode.insertBefore(js, fjs);
		}
	});
}(angular));
