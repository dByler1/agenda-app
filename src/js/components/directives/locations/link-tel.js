angular
  .module('msProgram')
  .directive('linkTel', function () {
    return {
      restrict: 'A',
      link: function (scope, element) {

        element.attr('href', 'tel://' + scope.location.phone);

      }
    };
  });
