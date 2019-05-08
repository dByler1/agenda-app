(function($, window, document, undefined) {

  /**
   * AppCache update progress
   */
  AppCache = $.extend(window.applicationCache, {
    debug: false,
    autoswap: true,
    showUpdateProgress: true,
    showUpdateNotice: true,
    handleLogout: false,
    logoutLink: 'a[href*=logout]',
    appStatus: 'online',
    appEvents: {},
    // Create a cache properties object to help us keep track of
    // the progress of the caching.
    filesDownloaded: 0,
    totalFiles: 0,
    // TODO - Chrome ignores abort(), Safari gags a few times
    // allowUpdateFlag: false,
    mobileIndicator: '#mobile-refresh',
    // Get the total number of files in the cache manifest,
    // parsing the manifest file on the first run to count
    // the number of files, then store the total with
    // localStorage
    getTotalFiles: function() {
      // Check the total file count and reset download count.
      AppCache.filesDownloaded = 0;
      var lastTotalFiles = (localStorage.getItem('appCacheTotalFiles')) ? JSON.parse((localStorage.getItem('appCacheTotalFiles'))) : 0;
      AppCache.totalFiles = lastTotalFiles;

      if (lastTotalFiles) return lastTotalFiles;

      // Or grab the cache manifest file.
      $.ajax({
        type: "GET",
        url: "manifest.appcache",
        dataType: "text",
        cache: false,
        success: function( content ) {
          content = content.replace(
            new RegExp(
              "(NETWORK|FALLBACK):" +
              "((?!(NETWORK|FALLBACK|CACHE):)[\\w\\W]*)",
              "gi"
              ),
              ""
          );
          // Strip out all comments.
          content = content.replace(
            new RegExp( "#[^\\r\\n]*(\\r\\n?|\\n)", "g" ),
              ""
          );
          // Strip out the cache manifest header and
          // trailing slashes.
          content = content.replace(
            new RegExp( "CACHE MANIFEST\\s*|\\s*$", "g" ),
              ""
          );
          // Strip out extra line breaks and replace with
          // a hash sign that we can break on.
          content = content.replace(
            new RegExp( "[\\r\\n]+", "g" ),
              "#"
          );
          // Get the total number of files.
          var totalFiles = content.split( "#" ).length + 1;
          // Store the total number of files. Here, we are
          // adding one for *THIS* file, which is cached
          // implicitly as it points to the manifest.
          AppCache.totalFiles = totalFiles;
          localStorage.setItem('appCacheTotalFiles', JSON.stringify(totalFiles));
          return totalFiles;
        }
      });
    },

    // Calls update() and force a page refresh on updateready, used for logout
    reloadCaches: function(loadingElement) {
      $(AppCache).on('updateready', function(e) {
        loadingElement.remove();
        window.location.reload();
      }, false);
      AppCache.update();
    }
	
  });
  
  $(AppCache).on("checking", function( event ){
	  $('#appcache-update-progress').addClass('slidein');
  });

  // This gets fired when new cache files have been downloaded
  // and are ready to replace the *existing* cache. The old
  // cache will need to be swapped out.
  $(AppCache).on("updateready", function( event ) {
    // Swap out the old cache.
    if (AppCache.autoswap || AppCache.showUpdateNotice) AppCache.swapCache();
    if (AppCache.showUpdateNotice) {
      // Remove previous messages (inactive tabs)
      var hideUpdateNotice = function() {
        $('#dl-modal-update').modal('hide');
      }
	  
      hideUpdateNotice();

      // Remove update progress
      $('#appcache-update-progress').addClass('slideout');

      if ( typeof(navigator.standalone) != 'undefined' && navigator.standalone ) {
        $(AppCache.mobileIndicator).css('text-shadow', '0 0 5px #fff');
      }
	  
	  $('#dl-modal-update').modal('show');
	  $('body').on('click', '#dl-update', function() {
		  localStorage.setItem('manual-updated', 'true');
		  setTimeout( function() {
			  window.location.reload();
		  }, 300);
	  });
    }
	
  });

  // This gets fired when the browser is downloading the files
  // defined in the cache manifest.
  $(AppCache).on("downloading", function( event ) {
    // Get the total number of files in our manifest.
    AppCache.getTotalFiles();

    // Show update progress bar
	if (!$('#appcache-update-progress').hasClass('slidein')) {
		$('#appcache-update-progress').addClass('slidein');
	}

  });

  // This gets fired for every file that is downloaded by the
  // cache update.
  $(AppCache).on("progress", function( event ) {

    // Increment the running total.
    filesDownloaded = AppCache.filesDownloaded++;
    localStorage.setItem('appCacheTotalFiles', JSON.stringify(filesDownloaded));

    // Update our progress bar
    if (AppCache.showUpdateProgress) {

		var filesPercent = filesDownloaded * 100 / AppCache.totalFiles;
		var progressElement = $('#appcache-progress-status');
		progressElement.css('width', filesPercent + '%');
  
		if (filesPercent == 100) {
			setTimeout ( function() {
				$('#appcache-update-progress').removeClass('slidein');
			}, 1000);
		}
		
    }

  });
  
  $(AppCache).on("cached", function( event ) {
	setTimeout ( function() {
		$('#appcache-update-progress').removeClass('slidein');
	}, 1000);
  });

  if (AppCache.handleLogout) {
    $(AppCache.logoutLink).on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).append($('<span id="logout-loading"><span>&nbsp;&nbsp;</span><i class="icon-spinner icon-spin"></i></span>'));
      $.ajax({
        url: $(this).attr('href'),
        type: 'GET'
      }).done( function(data) {
        AppCache.reloadCaches($('#logout-loading'));
      });
    });
  }

})(window.jQuery || window.Zepto, window, document);