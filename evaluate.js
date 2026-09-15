/**
 * Safe arithmetic expression evaluator (no eval / no Function).
 * Supports + - * / % with precedence; rejects unexpected characters.
 * @param {string} expr
 * @returns {{ ok: true, value: number } | { ok: false, error: string }}
 */
function evaluateExpression(expr) {
  if (typeof expr !== 'string') {
    return { ok: false, error: 'Invalid input' };
  }
  var s = expr.replace(/\s+/g, '');
  if (s.length === 0) {
    return { ok: false, error: 'Empty expression' };
  }
  // Only digits, decimal point, and the five operators
  if (!/^[0-9+\-*/%.]+$/.test(s)) {
    return { ok: false, error: 'Unexpected character' };
  }

  var tokens = [];
  var i = 0;
  while (i < s.length) {
    var ch = s.charAt(i);
    if (ch >= '0' && ch <= '9' || ch === '.') {
      var start = i;
      var sawDot = ch === '.';
      i++;
      while (i < s.length) {
        var c = s.charAt(i);
        if (c >= '0' && c <= '9') {
          i++;
        } else if (c === '.' && !sawDot) {
          sawDot = true;
          i++;
        } else {
          break;
        }
      }
      var numStr = s.slice(start, i);
      if (numStr === '.' || numStr.lastIndexOf('.') !== numStr.indexOf('.')) {
        return { ok: false, error: 'Invalid number' };
      }
      var n = Number(numStr);
      if (!isFinite(n)) {
        return { ok: false, error: 'Invalid number' };
      }
      tokens.push({ type: 'num', value: n });
    } else if ('+-*/%'.indexOf(ch) !== -1) {
      tokens.push({ type: 'op', value: ch });
      i++;
    } else {
      return { ok: false, error: 'Unexpected character' };
    }
  }

  // Disallow operator at start/end (except we don't support unary minus in this UI)
  if (tokens.length === 0) {
    return { ok: false, error: 'Empty expression' };
  }
  if (tokens[0].type !== 'num' || tokens[tokens.length - 1].type !== 'num') {
    return { ok: false, error: 'Malformed expression' };
  }
  for (var t = 1; t < tokens.length; t++) {
    var expectNum = t % 2 === 0;
    if (expectNum && tokens[t].type !== 'num') {
      return { ok: false, error: 'Malformed expression' };
    }
    if (!expectNum && tokens[t].type !== 'op') {
      return { ok: false, error: 'Malformed expression' };
    }
  }

  var prec = { '+': 1, '-': 1, '*': 2, '/': 2, '%': 2 };

  // Shunting-yard to RPN
  var output = [];
  var ops = [];
  for (var j = 0; j < tokens.length; j++) {
    var tok = tokens[j];
    if (tok.type === 'num') {
      output.push(tok);
    } else {
      while (
        ops.length > 0 &&
        prec[ops[ops.length - 1].value] >= prec[tok.value]
      ) {
        output.push(ops.pop());
      }
      ops.push(tok);
    }
  }
  while (ops.length > 0) {
    output.push(ops.pop());
  }

  var stack = [];
  for (var k = 0; k < output.length; k++) {
    var item = output[k];
    if (item.type === 'num') {
      stack.push(item.value);
    } else {
      if (stack.length < 2) {
        return { ok: false, error: 'Malformed expression' };
      }
      var b = stack.pop();
      var a = stack.pop();
      var r;
      switch (item.value) {
        case '+':
          r = a + b;
          break;
        case '-':
          r = a - b;
          break;
        case '*':
          r = a * b;
          break;
        case '/':
          if (b === 0) {
            return { ok: false, error: 'Division by zero' };
          }
          r = a / b;
          break;
        case '%':
          if (b === 0) {
            return { ok: false, error: 'Division by zero' };
          }
          r = a % b;
          break;
        default:
          return { ok: false, error: 'Unknown operator' };
      }
      if (!isFinite(r)) {
        return { ok: false, error: 'Invalid result' };
      }
      stack.push(r);
    }
  }

  if (stack.length !== 1) {
    return { ok: false, error: 'Malformed expression' };
  }
  return { ok: true, value: stack[0] };
}

// Dual env: browser global + Node require
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { evaluateExpression: evaluateExpression };
}
