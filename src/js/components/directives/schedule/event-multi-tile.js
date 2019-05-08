angular
  .module('msProgram')
  .directive('eventMultiTile', function () {
    return {
      restrict: 'A',
      link: function (scope, element) {

        var type = scope.session.type;

        switch (type) {
          case "professor":
            element.addClass('professor');
            break;
          default:
            element.addClass('breakout');
        }

      }
    };
  });
