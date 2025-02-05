function isAlphaNumeric(ch) {
  return /[a-zA-Z0-9]/.test(ch)
}

function isSpace(ch) {
  return /[ \v\r\n\t\f]/.test(ch)
}

class CommandLexer {
  constructor(str) {
    this.str = str;
    this.cursor = 0;
    this.delta = 0;
    this.peekEnum = 0;
  }

  /*step() {
    var a = (function () {
      p = this.delta;
    }).bind(this);
    var enumIds = {
      '=': 9,
      ',': 10,
      '{': 17,
      '}': 18,
      '[': 15,
      ']': 16,
      ':': 11,
      '!': 12,
      '#': 14
    };

    this.cursor += this.delta;
    var p = 0;
    while (1) {
      if (!p) {
        var ch = this.str[this.cursor + p];
        for (var c in enumIds)
          if (ch == c) {
            this.peekEnum = enumIds[c];
            return
          }

        if (ch == '@') {
          this.peekEnum = 4;
          a();
          continue;
        } else if (ch == '"') {
          this.peekEnum = 19;
          a();
          continue;
        } else if (/[0-9]/.test(ch) || ch == '+') {
          this.peekEnum = 1;
          a();
          continue;
        }

        switch (ch) {
          case '-':
            this.peekEnum = 2;
            a();
            continue;
          case '*':
            this.peekEnum = 13;
            a();
            continue;
          case '/':
            this.peekEnum = 5;
            a();
            continue;
          case '%':
            if (this.str[this.cursor + p + 1] != '=') {
              this.peekEnum = 32;
              a();
              continue;
            }
            this.peekEnum = 29;
            this.delta = 2;
            return;
          case '>':
            this.peekEnum = 22;
            a();
            continue;
          case '<':
            this.peekEnum = 21;
            a();
            continue;
          case '~':
            this.peekEnum = 7;
            a();
            continue;
          case '^':
            this.peekEnum = 8;
            a();
            continue;
          case '.':
            this.peekEnum = 20;
            a();
            continue;
        }

        if ( Util::isAlphaNumeric((Util *)(unsigned __int8)v9) )
          goto LABEL_96;
        if ( (unsigned __int8)(v9 - '(') <= '7' ) // )*+,-./
        {
          v11 = 0x80000000840003i64;
          if ( _bittest64(&v11, (unsigned int)v9 - '(') )
            goto LABEL_96;
        }
        if ( (v9 & 0x80u) != 0i64 )
          goto LABEL_96;
        if ( (unsigned __int8)v9 <= 0x7Eu && isspace(v9) )
        {
          ++this->str;
          --this->delta;
          goto LABEL_147;
        }
        goto LABEL_93;
      }

      }
      if (this.peekEnum == 13) {
        if (ch == '=') {
          this.peek = 27;
          this.delta = p + 1;
        }
        return;
      } if (this.peekEnum == 5) {
        if (ch == '=') {
          this.peek = 28;
          this.delta = p + 1;
        }
        return;
      }
      if (this.peekEnum == 22)
        break;
      if (this.peekEnum == 21) {
        if (ch == '=') {
          this.peek = 23;
          this.delta = p + 1;
        }
        return;
      }

      if (this.peekEnum <= 2) {
        if (/[0-9]/.test(ch)) {
          this.delta = p + 1;
          //goto LABEL_147;
        }
        if (ch == '.') {
          if (this.str[this.cursor + p + 1] == '.')
            return;
          this.peek = 6;
          this.delta = v33;
          //goto LABEL_147;
        }
        if (!isAlphaNumeric(ch)) {
          if ((unsigned __int8) (v9 - 40) > 0x37u
            || (v34 = 0x80000000840023i64, !_bittest64(& v34, (unsigned int)(v9 - 40))) )
          {
            if ((_BYTE)v9 == 61 && this -> delta == 1 )
            {
              var v40 = this.str[this.cursor];
              if (v40 == 43) {
                this.peek = 25;
                this.delta = 2;
              }
              else if (v40 == 45) {
                this.peek = 26;
                this.delta = 2;
              }
            }
            return;
          }
        }
        if (isAlphaNumeric(ch)
          || (LOBYTE(v9) = v9 - 40, (unsigned __int8) v9 <= 0x37u) && (v35 = 0x80000000000023i64, _bittest64(& v35, v9)) )
        {
          v36 = 0;
          if (this.delta) {
            do {
              v37 = this.str[this.cursor];
              if (!isAlphaNumeric(v37)) {
                v38 = v37 - 40;
                if (v38 > 0x37u || !_bittest64(& v6, (char)v38) )
                    goto LABEL_149;
              }
            }
            while (++v36 < this.delta);
          }
          v39 = 31;
        }
          else {
          LABEL_149:
          v39 = 3;
        }
        this -> peek = v39;
        LABEL_146:
        ++this -> delta;
          goto LABEL_147;
      }
    }
  }*/

  step() {
    var enumIds = {
      '=': 9,
      ',': 10,
      '{': 17,
      '}': 18,
      '[': 15,
      ']': 16,
      ':': 11,
      '!': 12,
      '#': 14
    };
    var p = 0;
    this.cursor += this.delta;
    while (1) {
      var ch = this.str[this.cursor + p];
      if (!p) {
        this.delta = 1;
        for (var c in enumIds)
          if (ch == c) {
            this.peekEnum = enumIds[c];
            return
          }

        if (ch == '@') {
          this.peekEnum = 4;
          p = this.delta;
          continue;
        } else if (ch == '"') {
          this.peekEnum = 19;
          p = this.delta;
          continue;
        } else if (/[0-9]/.test(ch) || ch == '+') {
          this.peekEnum = 1;
          p = this.delta;
          continue;
        }

        switch (ch) {
          case '-':
            this.peekEnum = 2;
            p = this.delta;
            continue;
          case '*':
            this.peekEnum = 13;
            p = this.delta;
            continue;
          case '/':
            this.peekEnum = 5;
            p = this.delta;
            continue;
          case '%':
            if (this.str[this.cursor + p + 1] != '=') {
              this.peekEnum = 32;
              p = this.delta;
              continue;
            }
            this.peekEnum = 29;
            this.delta = 2;
            return;
          case '>':
            this.peekEnum = 22;
            p = this.delta;
            continue;
          case '<':
            this.peekEnum = 21;
            p = this.delta;
            continue;
          case '~':
            this.peekEnum = 7;
            p = this.delta;
            continue;
          case '^':
            this.peekEnum = 8;
            p = this.delta;
            continue;
          case '.':
            this.peekEnum = 20;
            p = this.delta;
            continue;
        }

        if (isAlphaNumeric(ch)) {
          this.peekEnum = 3;
          p = this.delta;
          continue;
        }

        if (isSpace(ch)) {
          this.cursor++;
          this.delta--;
          p = this.delta;
          continue;
        }

        this.peekEnum = 32;
        continue;
      } else {
        var v12 = this.peekEnum;
        if (v12 == 13) {
          if (ch == '=') {
            this.peekEnum = 27;
            this.delta = p + 1;
          }
          return;
        }
        if (v12 == 5) {
          if (ch == '=') {
            this.peekEnum = 28;
            this.delta = p + 1;
          }
          return;
        }
        if (v12 == 22)
          break;
        if (v12 == 21) {
          if (ch == '=') {
            this.peekEnum = 23;
            this.delta = p + 1;
          }
          return;
        }
        if (v12 <= 2) {
          if (/[0-9]/.test(ch)) {
            this.delta = p + 1;
            //goto LABEL_147;
          }
          if (ch == '.') {
            if (this.str[this.cursor + p + 1] == '.')
              return;
            this.peekEnum = 6;
            this.delta = p + 1;
            p = this.delta;
            continue;
            //goto LABEL_147;
          }
          if (!isAlphaNumeric(ch)) {
            if ((unsigned __int8) (_ch - 40) > '7'
              || (v34 = 0x80000000840023i64, !_bittest64(& v34, (unsigned int)(_ch - 40))) )
            {
              if (ch == '=' && this.delta == 1) {
                var v40 = this.str[this.cursor];
                if (v40 == '+') {
                  this.peekEnum = 25;
                  this.delta = 2;
                }
                else if (v40 == '-') {
                  this.peekEnum = 26;
                  this.delta = 2;
                }
              }
              return;
            }
          }
          if (isAlphaNumeric(ch)
            /*|| (LOBYTE(_ch) = _ch - 40, (unsigned __int8) _ch <= 0x37u) && (v35 = 0x80000000000023i64, _bittest64(& v35, _ch)) */) {
            var v36 = 0, v39 = 3;
            if (this.delta) {
              do {
                v37 = this.str[this.cursor + v36];
                if (!isAlphaNumeric(v37)) {
                  v38 = v37 - '(';
                  if ((unsigned __int8) v38 > '7' || !_bittest64(& v6, v38) )
                  //goto LABEL_149;
                }
              }
              while (++v36 < this.delta);
            }
            v39 = 31;
          }
          else {
            v39 = 3;
          }
          this.peekEnum = v39;
          this.delta++;
          p = this.delta;
          continue;
        }
      }

      if (ch == '<') {
        this.peekEnum = 30;
        this.delta = p + 1;
        return;
      }
      if (ch == '=') {
        this.peekEnum = 24;
        this.delta = p + 1;
        return
      }
    }
  }

  peek() {
    return this.str[this.cursor]
  }
}