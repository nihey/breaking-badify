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
