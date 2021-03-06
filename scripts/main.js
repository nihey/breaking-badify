var getElement = require('lib/get-element');
var electronPerShell = require('lib/electron-per-shell');
var sendFirebase = require('lib/send-firebase');
var html2canvas = require('html2canvas');
$.fn.flash = require('lib/flash');

const WIKIPEDIA_BASE = 'https://en.wikipedia.org/wiki/';

function getString(element) {
  if (element.constructor === Array) {
    return element[0].toString();
  }
  return element.toString() || '';
}

function replaceElement(data, line) {
  $(`.line-${line}[data-placing=1]`).text(data.string[0]);
  $(`.line-${line}[data-placing=2]`).text(data.string[1]);
  $(`.line-${line}[data-placing=3]`).text(data.string[2]);

  var domElement = $(`.chemical-element[data-line=${line}]`);
  var atomicMass = getString(data.element.atomicMass).replace(/\(.*$/, '');
  domElement.find('[role=top-left]').text(parseFloat(atomicMass).toFixed(3));
  domElement.find('[role=bottom-left-1]').text(data.element.atomicNumber);
  domElement.find('[role=bottom-left-2]').text(electronPerShell(data.element));

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

$('#download-button').click(function() {
  html2canvas($('#breakingbad')[0]).then(function(canvas) {
    // Add missing border to the canvas
    var kanvas = document.createElement('canvas');
    kanvas.width = canvas.width;
    kanvas.height = canvas.height;
    var context = kanvas.getContext('2d');
    context.fillStyle = '#21271E';
    context.fillRect(0, 0, kanvas.width, kanvas.height);
    kanvas.getContext('2d').drawImage(canvas, 0, 0);

    // Download the image
    var [first='Breaking', second='Bad'] = location.hash.replace('#!/', '').split('/');
    var link = document.createElement('a');
    link.setAttribute('download', `${first} ${second}.png`);
    link.href = kanvas.toDataURL('image/png');
    link.click();
  });
});

$('#form-badify').submit(function(event) {
  event.preventDefault();
  location.hash = '!/' + encodeURIComponent($('#word-1').val()) + '/' +
                  encodeURIComponent($('#word-2').val());
});

let onHashChange = function() {
  if (!Environment.DEBUG) {
    // Only send Google Analytics data when running on production mode
    ga('create', 'UA-64926367-1', 'auto');
    ga('send', 'pageview');
  }

  var [first, second] = location.hash.replace('#!/', '').split('/');
  first = decodeURIComponent(first || 'Breaking');
  second = decodeURIComponent(second || 'Bad');

  $('#word-1').val(first);
  $('#word-2').val(second);

  var [firstElement, secondElement] = [getElement(first), getElement(second)];
  replaceElement(firstElement, 1);
  replaceElement(secondElement, 2);
  $('#element-1').text(firstElement.element.name);
  $('#element-1').attr('href', WIKIPEDIA_BASE + firstElement.element.name);
  $('#element-2').text(secondElement.element.name);
  $('#element-2').attr('href', WIKIPEDIA_BASE + secondElement.element.name);
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

  // Dirty hack to show the results only everything is good-looking on the
  // first run
  $('#breakingbad').css({opacity: 100});
  sendFirebase(first, second);
};
window.onhashchange = onHashChange;

$(document).ready(function() {
  onHashChange();

  // Makes the player flash, so that it becomes evident for the user that it is
  // possible to enable audio
  $('#player').flash({interval: 500, iterations: 2});

  // Automatically add target attribute to all links so that they open on
  // another tab
  $('a').each(function(index) {
    $(this).attr('target', index);
  });
});
