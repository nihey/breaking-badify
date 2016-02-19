function tryFlash(element, iterations, options) {
  // Flash start
  element.css({opacity: 1});
  setTimeout(function() {
    // Flash end
    element.css({opacity: ''});
    setTimeout(function() {
      // Call it again if the number of iterations is not over
      iterations && tryFlash(element, iterations - 1, options);
    }, options.interval);
  }, options.interval);
}

module.exports = function(options) {
  this.each(function() {
    tryFlash($(this), options.iterations, options);
  });
};
