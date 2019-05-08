angular
  .module('msProgram')
  .directive('yammerFeed', function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/yammer/yammer-feed.html',
      link: function (scope, element) {

        yam.connect.embedFeed(
          {
            container: '#embedded-feed',
            network: 'mindresearch.net',
            feedType: 'group',
            feedId: '5671736',
            config: {
              defaultGroupId: 5671736
            }
        });

        $('#embedded-feed').find('iframe').attr('scrolling', 'yes');
      }
    };
  });
