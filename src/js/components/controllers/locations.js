angular.module('msProgram')
  .controller('LocationsController', ['$http', '$scope', function($http, $scope) {

    $http({
      method: 'GET',
      url: './models/locations.json'
    }).success(function(data) {
      $scope.locations = data;
    });

  }]);