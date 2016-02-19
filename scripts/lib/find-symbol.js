var periodicTable = require('periodic-table');

/** Should the candidate replace the current symbol? */
var shouldChange = function(candidate, current, string) {
  if (!current) {
    return true;
  }
  // Just be sure all strings are uniform
  string = string.toLowerCase();
  var currentIndex = string.indexOf(current.toLowerCase());
  var candidateIndex = string.indexOf(candidate.toLowerCase());

  // First try with whoever appeas first, then try it with whoever is larger
  return candidateIndex < currentIndex || (candidateIndex === currentIndex &&
         candidate.length > current.length);
};

/** Return the first alphabetical perioc table symbol the string contains */
module.exports = function(string) {
  string = string.toLowerCase();

  var foundSymbol = null;
  Object.keys(periodicTable.symbols).forEach(function(symbol) {
    var index = string.indexOf(symbol.toLowerCase());

    if (index > -1 && shouldChange(symbol, foundSymbol, string)) {
      foundSymbol = symbol;
    }
  });

  return foundSymbol && {
    index: string.indexOf(foundSymbol.toLowerCase()),
    element: periodicTable.symbols[foundSymbol],
  };
};
