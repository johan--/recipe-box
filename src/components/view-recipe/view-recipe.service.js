// Code adapted from http://popdevelop.com/2014/07/sexy-splash-modal-using-bootstrap-css3-and-angularjs

'use strict';

angular.module('recipeBox')
	.service('$splash', ['$modal', '$rootScope', function($modal, $rootScope) {
			return {

				open: function(attrs, opts) {
					var scope = $rootScope.$new();
					angular.extend(scope, attrs);
					opts = angular.extend(opts || {}, {
						backdrop: false,
						scope: scope,
						templateUrl: 'view-recipe/content.html',
						windowTemplateUrl: 'view-recipe/index.html'

					});
					return $modal.open(opts);
				}
			};


}])

