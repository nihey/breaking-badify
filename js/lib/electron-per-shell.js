var periodicTable = require('periodic-table');

/* Return a array with 9 zeroed elements */
function getEmptyLevels() {
  return '123456789'.split('').map(function(){return 0;});
}

/** Return the number of electrons on each atom shell
 *
 * @param {String} electronicConfiguration The electronic configuration
 *
 * @returns {Array} List with the number of electrons on each shell
 */
function perShell(electronicConfiguration) {
  // Start with the noble gas configuration
  var levels = getNobleGasShell(electronicConfiguration);

  // Remove the noble gas from the query and build an array containing each
  // subshell.
  electronicConfiguration = electronicConfiguration.replace(/.*\](\.|\ )/, '');
  var subLevels = electronicConfiguration.split(/[\.|\ ]/g);
  subLevels.forEach(function(config) {
    // Get the level and the amount of electrons on each subshell
    var [level, sum] = config.split(/[spdf]/).map(n => parseInt(n));
    // Then add them in the levels array
    levels[level] += sum;
  });
  return levels;
}

/** Get the noble gas electronic shells on the configuration
 *
 *  When requesting for '[He] 2s1', for example, it will return the 'perShell'
 *  result of the Helium element.
 *
 * @param {String} electronicConfiguration The electronic configuration
 *
 *  @returns {Array} perShell result of the noble gas in configuration
 */
function getNobleGasShell(electronicConfiguration) {
  // Extract the noble gas symbol
  var match = electronicConfiguration.match(/[^\[\]]+(?=\])/g);
  if (!match) {
    // Return an empty shell if no noble gas was found
    return getEmptyLevels();
  }
  // Return the noble gas per shell configuration
  var element = periodicTable.symbols[match[0]];
  return perShell(element.electronicConfiguration);
}

/** Convert a raw electronic configuration to a per shell description
 *
 * This function converts an electronic configuration, such as '[He] 2s1' to
 * '2-1', the corresponding per shell description of the configuration.
 *
 * @param {String} element The electronic configuration
 *
 * @returns {String} The per shell configuration
 */
module.exports = function(element) {
  var shells = perShell(element.electronicConfiguration);
  shells = shells.filter(electrons => electrons);
  return shells.join('-');
};
