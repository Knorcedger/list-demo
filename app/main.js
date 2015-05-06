var test = angular.module('test', []);

test.controller('main', function($scope) {

	// when the selectedAccountIndex changes, update the current scope account
	$scope.$watch('selectedAccountIndex', function() {
		$scope.account = $scope.accounts[$scope.selectedAccountIndex];
	});

	// accounts to display on the list
	$scope.accounts = [{
		nickname: 'Salary',
		amount: 100
	}, {
		nickname: 'Household',
		amount: 321
	}];

	// preselect the first account
	$scope.selectedAccountIndex = 0;

});

test.directive('list', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			selected: '='
		},
		template: '<div><div>Add filter here... Must be directive as well</div><ul ng-transclude></ul></div>',
		link: function(scope, element, attrs) {
			scope.$watch('selected', function() {
				console.log('selected = ' + scope.selected);
			});
		},
		controller: function($scope, $element) {
			this.setSelected = function(selected) {
				$scope.selected = selected;
			}
		},
	};
});

test.directive('listItem', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			item: '='
		},
		templateUrl: function(element, attr) {
			return 'list-item-' + attr.type + '.html';
		},
		link: function(scope, element, attrs) {

		}
	};
});

// selects a list item on click
test.directive('selectable', function() {
	return {
		restrict: 'A',
		require: '^list',
		link: function(scope, element, attrs, controller) {
			element.on('click', function() {
				controller.setSelected(scope.$index);
				scope.$apply();
			});
		}
	}
})
