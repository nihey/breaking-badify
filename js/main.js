var getElement = require('lib/get-element');

function getString(element) {
  if (element.constructor === Array) {
    return element[0].toString();
  }
  return element.toString() || '';
}

function lineWidth(line) {
  return $(`.line-${line}[data-placing=1]`).outerWidth() +
         $(`.chemical-element[data-line=${line}]`).outerWidth() +
         $(`.line-${line}[data-placing=3]`).outerWidth();
}

function replaceElement(data, line) {
  $(`.line-${line}[data-placing=1]`).text(data.string[0]);
  $(`.line-${line}[data-placing=2]`).text(data.string[1]);
  $(`.line-${line}[data-placing=3]`).text(data.string[2]);

  var domElement = $(`.chemical-element[data-line=${line}]`);
  var atomicMass = getString(data.element.atomicMass).replace(/\(.*$/, '');
  domElement.find('[role=top-left]').text(atomicMass);
  domElement.find('[role=bottom-left-1]').text(data.element.atomicNumber);
  var electronicConfiguration = data.element.electronicConfiguration;
  domElement.find('[role=bottom-left-2]').text(electronicConfiguration);

  var oxidationStates = '';
  getString(data.element.oxidationStates).split(',').forEach(function(state) {
    if (state === '') {
      return;
    }
    var number = parseInt(state);
    oxidationStates += (number > 0 ? '+' : '')  + number + ' ';
  });
  domElement.find('[role=top-right]').text(oxidationStates);
}

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
  first = decodeURIComponent(first || 'Breaking');
  second = decodeURIComponent(second || 'Bad');

  $('#word-1').val(first);
  $('#word-2').val(second);

  replaceElement(getElement(first), 1);
  replaceElement(getElement(second), 2);
  $('.line-1[data-placing=1]').css({'margin-left': '0'});
  $('.line-2[data-placing=1]').css({'margin-left': '0'});

  // XXX Adjusting the div's positioning in javascript is not elegant and may
  // not be good in the long run. We should find a way to replace this with
  // pure CSS
  $('#breakingbad').width(999999);

  var margin = $('.chemical-element[data-line=1]').position().left +
               $('.chemical-element[data-line=1]').outerWidth() -
               $('.chemical-element[data-line=2]').position().left;
  if (margin > 0) {
    $('.line-2[data-placing=1]').css({'margin-left': margin + 'px'});
  } else {
    $('.line-1[data-placing=1]').css({'margin-left': -margin + 'px'});
  }

  var minLeft = Math.min($('.line-1[data-placing=1]').position().left,
                         $('.line-2[data-placing=1]').position().left);
  var maxRight = Math.max($('.line-1[data-placing=3]').position().left +
                          $('.line-1[data-placing=3]').outerWidth(),
                          $('.line-2[data-placing=3]').position().left +
                          $('.line-2[data-placing=3]').outerWidth());
  var padding = parseInt($('#breakingbad').css('padding-left').replace('px', ''));
  padding *= 2;
  $('#breakingbad').width(maxRight - minLeft + padding);
});

$(document).ready(function() {
  window.dispatchEvent(new Event('hashchange'));
});
