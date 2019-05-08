angular
  .module('msProgram')
  .directive('linkMap', function () {
    return {
      restrict: 'A',
      link: function (scope, element) {

        if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
          element.attr('href', 'http://maps.apple.com/?q=' + scope.location.address);
        } else {
          element.attr('href', 'http://maps.google.com/?q=' + scope.location.address);
        }

      }
    };
  });
