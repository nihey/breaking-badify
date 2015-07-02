$('#button-collapse').click(function() {
  $('#collapse-box').slideToggle(function() {
    if ($(this).is(':hidden')) {
      $('#button-collapse').addClass('fa-plus-circle');
      $('#button-collapse').removeClass('fa-minus-circle');
      return;
    }
    $('#button-collapse').addClass('fa-minus-circle');
    $('#button-collapse').removeClass('fa-plus-circle');
  });
});

$('#form-badify').submit(function(event) {
  event.preventDefault();
  location.hash = '!/' + encodeURIComponent($('#word-1').val()) + '/' +
                  encodeURIComponent($('#word-2').val());
});

$(window).on('hashchange', function() {
  var [first, second] = location.hash.replace('#!/', '').split('/');
  first = decodeURIComponent(first);
  second = decodeURIComponent(second);
  console.log(first, second);
});

window.dispatchEvent(new Event('hashchange'));
