angular
  .module('msProgram')
  .directive('scheduleTabs', function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/schedule/schedule-tabs.html',
      link: function (scope, element) {

        element.find('a').click(function (e) {
          e.preventDefault();
          $(this).tab('show');
        });

      }
    };
  });
