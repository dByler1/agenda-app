angular.module('msProgram')
  .controller('ExhibitsController', ['$http', '$scope', function ($http, $scope) {

    $http({method: 'GET', url: './models/exhibits.json'}).success(function (data) {
      $scope.exhibits = data;
    });
    
  }]);
