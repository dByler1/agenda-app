angular.module('msProgram')
  .controller('ScheduleController', [ '$http', '$scope', function ($http, $scope) {

    $http({method: 'GET', url: './models/schedule.json'}).success(function (data) {
      $scope.days = data;
    });
    
  }]);
