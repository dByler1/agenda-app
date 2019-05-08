angular
  .module('msProgram')
  .directive('eventMultiSession', ['angularLoad', function(angularLoad) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        element.on('click', function(e) {
          e.preventDefault();
          var multi = element.closest('.event-multi');
          var modal = $('#event-modal');
          modal.find('.modal-title').html(scope.session.title);
          modal.find('.modal-time').html('<b>Time: </b>' + '<span>' + element.attr('time') + '</span>');
          modal.find('.modal-speaker').html('<b>Speaker(s):</b> ' + '<span>' + scope.session.organizer + '</span>');
          modal.find('.modal-location').html('<b>Location:</b> ' + '<span>' + scope.session.location + '</span>');
          modal.find('.modal-description').html('<b>Description:</b> ' + '<span>' + scope.session.description + '</span>');
          modal.find('.modal-footer').html(
            '<div title="Add to Calendar" class="addthisevent" data-direct="outlook">' +
            'Add to Calendar' +
            '<span class="start">' + multi.attr('start') + '</span>' +
            '<span class="end">' + multi.attr('end') + '</span>' +
            '<span class="timezone">' + multi.attr('timezone') + '</span>' +
            '<span class="title">' + scope.session.title + '</span>' +
            '<span class="description">' + scope.session.description + '</span>' +
            '<span class="location">' + scope.session.location + '</span>' +
            '<span class="organizer">' + scope.session.organizer + '</span>' +
            '<span class="date_format">MM/DD/YYYY</span>' +
            '<span class="_alarm_reminder">15</span>' +
            '</div>'
          );
          modal.find('p span').each(function(i) {
            $(this).parent().removeClass('hide');
            if ($(this).html() === "") {
              $(this).parent().addClass('hide');
            }
          });

          var script = $('script[src="https://addthisevent.com/libs/1.6.0/ate.min.js"]');

          if (script.length > 0) {
            addthisevent.refresh();
          } else {
            angularLoad.loadScript('https://addthisevent.com/libs/1.6.0/ate.min.js').then(function() {
              addthisevent.settings({
                license: "aen768rfszu2rrgu4mpg5584",
                mouse: false,
                css: false
              });
            }).catch(function() {
              // If error run this code
            });
          }

          $('#event-modal').modal('show');

        });
      }
    };
  }]);