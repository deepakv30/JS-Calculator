'use strict';

var evaluateExpression = require('../evaluate.js').evaluateExpression;

var passed = 0;
var failed = 0;

function assert(cond, msg) {
  if (cond) {
    passed++;
    console.log('  PASS:', msg);
  } else {
    failed++;
    console.error('  FAIL:', msg);
  }
}

function assertValue(expr, expected) {
  var r = evaluateExpression(expr);
  assert(r.ok === true && r.value === expected, expr + ' → ' + expected + ' (got ' + JSON.stringify(r) + ')');
}

function assertError(expr, substr) {
  var r = evaluateExpression(expr);
  assert(r.ok === false && (!substr || String(r.error).indexOf(substr) !== -1),
    expr + ' should error' + (substr ? ' containing "' + substr + '"' : '') + ' (got ' + JSON.stringify(r) + ')');
}

console.log('evaluateExpression tests');

assertValue('12+3', 15);
assertValue('2+3*4', 14);
assertValue('10-4/2', 8);
assertValue('10%3', 1);
assertValue('100/4', 25);
assertValue('7*8+2', 58);
assertValue('1+2+3', 6);
assertValue('8/2*4', 16);
assertValue('9%4+1', 2);

assertError('1/0', 'zero');
assertError('5%0', 'zero');
assertError('alert(1)', 'Unexpected');
assertError('2+(3)', 'Unexpected');
assertError('2;3', 'Unexpected');
assertError('', 'Empty');
assertError('+', 'Malformed');
assertError('2+', 'Malformed');
assertError('2++3', 'Malformed');

console.log('\n' + passed + ' passed, ' + failed + ' failed');
process.exit(failed === 0 ? 0 : 1);
