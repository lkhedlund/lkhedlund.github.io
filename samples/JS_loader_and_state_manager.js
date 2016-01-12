// Single page AJAX Loader and State Manager

// AJAX Loader
$(function() {
  $('.ajaxtrigger').click(function() {
    // Grab the link from the menu
    var url = $(this).attr('href');
    var script = $(this).data('script');
    // Set the AJAX Target
    var $target = $('#ajaxtarget');
    // Grab the html contained within the grabber div
    $target.load(url + ' #ajaxgrab > *')
    // Add active class to menu bar
    $(".nav li").removeClass("active");
    $(this).parent('li').addClass("active");
    $.when(
      $.getScript(script),
      $.getScript('../../js/MultipleChoiceApp.js'),
      $.Deferred(function( deferred ){
        $( deferred.resolve );
      })
    ).done(function() {
      MultipleChoiceApp.init();
      $('#submit, #skip, #restart').on('click', function() {
         MultipleChoiceApp.advance_question(this.id);
      });
    });
    return false;
  });
});

// Basic State Manager
$(function () {
  // Global Variable
  var keplerData = [];
  // On page load grab JSON Data
  $.getJSON("data.min.json", function(data) {
    keplerData = data;
    $(window).trigger('hashchange');
  });

  // Call render on hash change
  $(window).on('hashchange', function() {
    render(window.location.hash);
  });

  function render(url) {
    // Grab the url following localhost
    var temp = url.split('/')[0];

    $('#space_container .page').removeClass('visible');

    var map = {
      // Homepage: route ''
      '': function() {
        renderStarmapPage(keplerData);
      },
    };

    if (map[temp]) {
      map[temp]();
    } else {
      renderErrorPage();
    }
  };

  function renderStarmapPage(data) {
    var page = $('.starmap');
    page.addClass('visible');
    starmap(data);
  };

  function renderErrorPage() {
    var page = $('.error');
    page.addClass('visible');
  };

});
