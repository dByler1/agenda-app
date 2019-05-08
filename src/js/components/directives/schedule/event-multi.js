angular
  .module('msProgram')
  .directive('eventMulti', function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/schedule/event-multi.html',
      controller: [ '$scope', '$location',
        function($scope, $element) {
          var controller = this;
          controller.session = $scope.session;
        }
      ],
      controllerAs: 'multiCtlr'
    };
  });
