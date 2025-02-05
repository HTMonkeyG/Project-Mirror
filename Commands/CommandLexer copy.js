function isAlphaNumeric(ch) {
  return /[a-zA-Z0-9]/.test(ch)
}

function isSpace(ch) {
  return /[ \v\r\n\t\f]/.test(ch)
}

class CommandLexer {
  static Enum = {

  };

  constructor(str) {
    this.str = Array.from(str);
    this.cursor = 0;
    this.delta = 0;
    this.state = 0;
  }

  step() {
    this.cursor += this.delta;
    if (!this.canRead()) {

    } else {
      var l = 0;
      this.delta = 1;
      while (1) {
        var ch = this.peek(l);
        if (/[=,{}\[\]:!#]/.test(ch))
          return ch;
        if (ch == "@") {
          this.state = "@";
          continue;
        }
        if (ch == '"') {
          this.state = '"';
          continue;
        }
        if (/[0-9]/.test(ch) || ch == "+") {
          this.state = 0;
          continue;
        }
        if (/[+\-*/%]/.test(ch)) {
          if (this.peek(1) == '=')
            return this.delta = 2, ch + this.peek(1);
          //return this.peek()
          if (/[+\-]/.test(ch))
            this.state = 1;
          else
            return ch
        }
        if (ch == "<") {
          if (this.peek(1) == "=")
            return this.delta = 2, ch + this.peek(1);
          return ch
        }
        if (ch == ">") {
          if (this.peek(1) == "=" || this.peek(1) == "<")
            return this.delta = 2, ch + this.peek(1);
          return ch
        }
      }
    }
  }

  readAlphaNumeric() {
    var i = 0, r = '';
    while (isAlphaNumeric(this.peek(i)))
      r += this.peek(i), i++;
    this.delta += i;
    return r
  }

  readNumber() {
    if(this.)
  }

  peek(a) {
    return this.str[this.cursor + (a || 0)]
  }

  canRead() {
    return this.cursor < this.str.length
  }
}