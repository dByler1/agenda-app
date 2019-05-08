angular
  .module('msProgram')
  .directive('eventTime', function () {
    return {
      restrict: 'E',
      link: function (scope, element) {

        var timeArray = scope.session.time.split("-");

        element.html('<span>' + timeArray[0] + '</span><span>' + timeArray[1] + '</span>');

      }
    };
  });
