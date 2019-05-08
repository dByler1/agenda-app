
angular
  .module('msProgram')
  .directive('navBar', function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/nav-bar.html',
      controller: [ '$scope', '$location',
        function ($scope, $location) {
          $scope.getClass = function (path) {
            if ($location.path().substr(0, path.length) == path) {
              if (path == "/" && $location.path() == "/") {
                return "active";
              }
              else if (path == "/") {
                return "";
              } return "active" }
              else { return "" }
            }
          }
        ]
    };
  });
