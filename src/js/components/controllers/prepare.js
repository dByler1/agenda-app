angular.module('msProgram')
  .controller('PrepareController', ['$http', '$scope', function ($http, $scope) {

    $http({method: 'GET', url: './models/prepare.json'}).success(function (data) {
      $scope.items = data;
    });
    
  }]);
