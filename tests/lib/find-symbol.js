var periodicTable = require('periodic-table');
var findSymbol = require('../../js/lib/find-symbol');

describe('Symbol finding', function() {
  it('hydrogen', function() {
    expect(findSymbol('Halt')).toEqual({
      index: 0,
      element: periodicTable.elements.Hydrogen,
    });
  });
});
