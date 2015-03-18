class TestComponentCtrl {

  greetings: string;

  static $inject = ['$scope', '$log', 'TestActions']
  constructor(private $scope: ng.IScope, private $log: ng.ILogService, private TestActions) {
    this.greetings = 'YIS';
  }

  update() {
    this.TestActions.update(this.greetings);
  }

}

angular.module('ngCmp.Components', [])
  .controller('TestComponentController', TestComponentCtrl);

function TestComponent(): ng.IDirective {

  var linker = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrls) => {

  }

  return {
     restrict: 'EA',
     controller: 'TestComponentController',
     controllerAs: 'test',
     bindToController: true,
     replace: true,
     templateUrl: 'src/components/test-component.mobile.html',
     link: linker
   };
 }
 TestComponent.$inject = [];

angular.module('ngCmp.Components')
  .directive('testCmp', TestComponent);
