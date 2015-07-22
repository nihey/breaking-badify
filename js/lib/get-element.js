var periodicTable = require('periodic-table'),
    findSymbol = require('lib/find-symbol');

module.exports = function(string) {
  // Find the symbol related to the string, or create a non-existing one
  var searchString = string.toLowerCase();
  var symbol = findSymbol(searchString) || {
    index: 0,
    element: $.extend({}, periodicTable.elements.Hydrogen, {
      symbol: searchString.charAt(0).toUpperCase(),
      name: 'Nothing',
    }),
  };

  return {
    element: symbol.element,
    string: [
      string.substring(0, symbol.index),
      symbol.element.symbol,
      string.substring(symbol.index + symbol.element.symbol.length),
    ],
  };
};
