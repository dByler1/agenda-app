angular
  .module('msProgram')
  .directive('locationFp', [ 'angularLoad', function (angularLoad) {
    return {
      restrict: 'A',
      link: function (scope, element) {

        var isHdpi = Modernizr.hires ? true : false,
            script = $('script[src="js/lightbox.js"]'),
            thumb = element.find('.fp-thumb'),
            loadLb = function () {
              angularLoad.loadScript('js/lightbox.js').then(function () {
              });
            };

      	thumb.each(function() {
      		var origSrc = $(this).data('image'),
      		    origSrcArr =  origSrc.split('.'),
      		    src = isHdpi ? origSrcArr[0] + "@2x.png" : origSrc;

      		$(this).css("background", "url(" + src + ")");
      		$(this).css("background-size", "175px 206px");

      	});

        if (script.length > 0) {
          script.remove();
        } 
        loadLb();

      }
    };
  }]);
