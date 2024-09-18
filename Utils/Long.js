var Long = (function () {
  function b(a, b, c) {
    this.low = 0 | a,
      this.high = 0 | b,
      this.unsigned = !!c
  }
  function c(a) {
    return !0 === (a && a.__isLong__)
  }
  function d(a, b) {
    var c, d, e;
    return b ? (e = 0 <= (a >>>= 0) && 256 > a) && (d = k[a]) ? d : (c = f(a, 0 > (0 | a) ? -1 : 0, !0),
      e && (k[a] = c),
      c) : (e = -128 <= (a |= 0) && 128 > a) && (d = j[a]) ? d : (c = f(a, 0 > a ? -1 : 0, !1),
        e && (j[a] = c),
        c)
  }
  function e(a, b) {
    if (isNaN(a))
      return b ? r : q;
    if (b) {
      if (0 > a)
        return r;
      if (a >= n)
        return w
    } else {
      if (-o >= a)
        return x;
      if (a + 1 >= o)
        return v
    }
    return 0 > a ? e(-a, b).neg() : f(a % m | 0, a / m | 0, b)
  }
  function f(a, c, d) {
    return new b(a, c, d)
  }
  function g(a, b, c) {
    if (0 === a.length)
      throw Error("empty string");
    if ("NaN" === a || "Infinity" === a || "+Infinity" === a || "-Infinity" === a)
      return q;
    if ("number" == typeof b ? (c = b,
      b = !1) : b = !!b,
      (c = c || 10) < 2 || c > 36)
      throw RangeError("radix");
    var d;
    if ((d = a.indexOf("-")) > 0)
      throw Error("interior hyphen");
    if (0 === d)
      return g(a.substring(1), b, c).neg();
    for (var f = e(l(c, 8)), h = q, i = 0; i < a.length; i += 8) {
      var j = Math.min(8, a.length - i)
        , k = parseInt(a.substring(i, i + j), c);
      if (8 > j) {
        var m = e(l(c, j));
        h = h.mul(m).add(e(k))
      } else
        h = (h = h.mul(f)).add(e(k))
    }
    return h.unsigned = b,
      h
  }
  function h(a, b) {
    return "number" == typeof a ? e(a, b) : "string" == typeof a ? g(a, b) : f(a.low, a.high, "boolean" == typeof b ? b : a.unsigned)
  }
  var i = null;
  try {
    i = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports
  } catch (a) { }
  b.prototype.__isLong__,
    Object.defineProperty(b.prototype, "__isLong__", {
      value: !0
    }),
    b.isLong = c;
  var j = {}
    , k = {};
  b.fromInt = d,
    b.fromNumber = e,
    b.fromBits = f;
  var l = Math.pow;
  b.fromString = g,
    b.fromValue = h;
  var m = 4294967296
    , n = m * m
    , o = n / 2
    , p = d(1 << 24)
    , q = d(0);
  b.ZERO = q;
  var r = d(0, !0);
  b.UZERO = r;
  var s = d(1);
  b.ONE = s;
  var t = d(1, !0);
  b.UONE = t;
  var u = d(-1);
  b.NEG_ONE = u;
  var v = f(-1, 2147483647, !1);
  b.MAX_VALUE = v;
  var w = f(-1, -1, !0);
  b.MAX_UNSIGNED_VALUE = w;
  var x = f(0, -2147483648, !1);
  b.MIN_VALUE = x;
  var y = b.prototype;
  y.toInt = function () {
    return this.unsigned ? this.low >>> 0 : this.low
  }
    ,
    y.toNumber = function () {
      return this.unsigned ? (this.high >>> 0) * m + (this.low >>> 0) : this.high * m + (this.low >>> 0)
    }
    ,
    y.toString = function (a) {
      if ((a = a || 10) < 2 || a > 36)
        throw RangeError("radix");
      if (this.isZero())
        return "0";
      if (this.isNegative()) {
        if (this.eq(x)) {
          var b = e(a)
            , c = this.div(b)
            , d = c.mul(b).sub(this);
          return c.toString(a) + d.toInt().toString(a)
        }
        return "-" + this.neg().toString(a)
      }
      for (var f = e(l(a, 6), this.unsigned), g = this, h = ""; ;) {
        var i = g.div(f)
          , j = (g.sub(i.mul(f)).toInt() >>> 0).toString(a);
        if ((g = i).isZero())
          return j + h;
        for (; j.length < 6;)
          j = "0" + j;
        h = "" + j + h
      }
    }
    ,
    y.getHighBits = function () {
      return this.high
    }
    ,
    y.getHighBitsUnsigned = function () {
      return this.high >>> 0
    }
    ,
    y.getLowBits = function () {
      return this.low
    }
    ,
    y.getLowBitsUnsigned = function () {
      return this.low >>> 0
    }
    ,
    y.getNumBitsAbs = function () {
      if (this.isNegative())
        return this.eq(x) ? 64 : this.neg().getNumBitsAbs();
      for (var a = 0 != this.high ? this.high : this.low, b = 31; b > 0 && 0 == (a & 1 << b); b--)
        ;
      return 0 != this.high ? b + 33 : b + 1
    }
    ,
    y.isZero = function () {
      return 0 === this.high && 0 === this.low
    }
    ,
    y.eqz = y.isZero,
    y.isNegative = function () {
      return !this.unsigned && this.high < 0
    }
    ,
    y.isPositive = function () {
      return this.unsigned || this.high >= 0
    }
    ,
    y.isOdd = function () {
      return 1 == (1 & this.low)
    }
    ,
    y.isEven = function () {
      return 0 == (1 & this.low)
    }
    ,
    y.equals = function (a) {
      return c(a) || (a = h(a)),
        (this.unsigned === a.unsigned || this.high >>> 31 != 1 || a.high >>> 31 != 1) && this.high === a.high && this.low === a.low
    }
    ,
    y.eq = y.equals,
    y.notEquals = function (a) {
      return !this.eq(a)
    }
    ,
    y.neq = y.notEquals,
    y.ne = y.notEquals,
    y.lessThan = function (a) {
      return this.comp(a) < 0
    }
    ,
    y.lt = y.lessThan,
    y.lessThanOrEqual = function (a) {
      return this.comp(a) <= 0
    }
    ,
    y.lte = y.lessThanOrEqual,
    y.le = y.lessThanOrEqual,
    y.greaterThan = function (a) {
      return this.comp(a) > 0
    }
    ,
    y.gt = y.greaterThan,
    y.greaterThanOrEqual = function (a) {
      return this.comp(a) >= 0
    }
    ,
    y.gte = y.greaterThanOrEqual,
    y.ge = y.greaterThanOrEqual,
    y.compare = function (a) {
      if (c(a) || (a = h(a)),
        this.eq(a))
        return 0;
      var b = this.isNegative()
        , d = a.isNegative();
      return b && !d ? -1 : !b && d ? 1 : this.unsigned ? a.high >>> 0 > this.high >>> 0 || a.high === this.high && a.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(a).isNegative() ? -1 : 1
    }
    ,
    y.comp = y.compare,
    y.negate = function () {
      return !this.unsigned && this.eq(x) ? x : this.not().add(s)
    }
    ,
    y.neg = y.negate,
    y.add = function (a) {
      c(a) || (a = h(a));
      var b = this.high >>> 16
        , d = 65535 & this.high
        , e = this.low >>> 16
        , g = 65535 & this.low
        , i = a.high >>> 16
        , j = 65535 & a.high
        , k = a.low >>> 16
        , l = 0
        , m = 0
        , n = 0
        , o = 0;
      return n += (o += g + (65535 & a.low)) >>> 16,
        m += (n += e + k) >>> 16,
        l += (m += d + j) >>> 16,
        l += b + i,
        f((n &= 65535) << 16 | (o &= 65535), (l &= 65535) << 16 | (m &= 65535), this.unsigned)
    }
    ,
    y.subtract = function (a) {
      return c(a) || (a = h(a)),
        this.add(a.neg())
    }
    ,
    y.sub = y.subtract,
    y.multiply = function (a) {
      if (this.isZero())
        return q;
      if (c(a) || (a = h(a)),
        i)
        return f(i.mul(this.low, this.high, a.low, a.high), i.get_high(), this.unsigned);
      if (a.isZero())
        return q;
      if (this.eq(x))
        return a.isOdd() ? x : q;
      if (a.eq(x))
        return this.isOdd() ? x : q;
      if (this.isNegative())
        return a.isNegative() ? this.neg().mul(a.neg()) : this.neg().mul(a).neg();
      if (a.isNegative())
        return this.mul(a.neg()).neg();
      if (this.lt(p) && a.lt(p))
        return e(this.toNumber() * a.toNumber(), this.unsigned);
      var b = this.high >>> 16
        , d = 65535 & this.high
        , g = this.low >>> 16
        , j = 65535 & this.low
        , k = a.high >>> 16
        , l = 65535 & a.high
        , m = a.low >>> 16
        , n = 65535 & a.low
        , o = 0
        , r = 0
        , s = 0
        , t = 0;
      return s += (t += j * n) >>> 16,
        r += (s += g * n) >>> 16,
        s &= 65535,
        r += (s += j * m) >>> 16,
        o += (r += d * n) >>> 16,
        r &= 65535,
        o += (r += g * m) >>> 16,
        r &= 65535,
        o += (r += j * l) >>> 16,
        o += b * n + d * m + g * l + j * k,
        f((s &= 65535) << 16 | (t &= 65535), (o &= 65535) << 16 | (r &= 65535), this.unsigned)
    }
    ,
    y.mul = y.multiply,
    y.divide = function (a) {
      if (c(a) || (a = h(a)),
        a.isZero())
        throw Error("division by zero");
      var b, d, g;
      if (i)
        return this.unsigned || -2147483648 !== this.high || -1 !== a.low || -1 !== a.high ? f((this.unsigned ? i.div_u : i.div_s)(this.low, this.high, a.low, a.high), i.get_high(), this.unsigned) : this;
      if (this.isZero())
        return this.unsigned ? r : q;
      if (this.unsigned) {
        if (a.unsigned || (a = a.toUnsigned()),
          a.gt(this))
          return r;
        if (a.gt(this.shru(1)))
          return t;
        g = r
      } else {
        if (this.eq(x))
          return a.eq(s) || a.eq(u) ? x : a.eq(x) ? s : (b = this.shr(1).div(a).shl(1)).eq(q) ? a.isNegative() ? s : u : (d = this.sub(a.mul(b)),
            g = b.add(d.div(a)));
        if (a.eq(x))
          return this.unsigned ? r : q;
        if (this.isNegative())
          return a.isNegative() ? this.neg().div(a.neg()) : this.neg().div(a).neg();
        if (a.isNegative())
          return this.div(a.neg()).neg();
        g = q
      }
      for (d = this; d.gte(a);) {
        b = Math.max(1, Math.floor(d.toNumber() / a.toNumber()));
        for (var j = Math.ceil(Math.log(b) / Math.LN2), k = 48 >= j ? 1 : l(2, j - 48), m = e(b), n = m.mul(a); n.isNegative() || n.gt(d);)
          n = (m = e(b -= k, this.unsigned)).mul(a);
        m.isZero() && (m = s),
          g = g.add(m),
          d = d.sub(n)
      }
      return g
    }
    ,
    y.div = y.divide,
    y.modulo = function (a) {
      return c(a) || (a = h(a)),
        i ? f((this.unsigned ? i.rem_u : i.rem_s)(this.low, this.high, a.low, a.high), i.get_high(), this.unsigned) : this.sub(this.div(a).mul(a))
    }
    ,
    y.mod = y.modulo,
    y.rem = y.modulo,
    y.not = function () {
      return f(~this.low, ~this.high, this.unsigned)
    }
    ,
    y.and = function (a) {
      return c(a) || (a = h(a)),
        f(this.low & a.low, this.high & a.high, this.unsigned)
    }
    ,
    y.or = function (a) {
      return c(a) || (a = h(a)),
        f(this.low | a.low, this.high | a.high, this.unsigned)
    }
    ,
    y.xor = function (a) {
      return c(a) || (a = h(a)),
        f(this.low ^ a.low, this.high ^ a.high, this.unsigned)
    }
    ,
    y.shiftLeft = function (a) {
      return c(a) && (a = a.toInt()),
        0 == (a &= 63) ? this : 32 > a ? f(this.low << a, this.high << a | this.low >>> 32 - a, this.unsigned) : f(0, this.low << a - 32, this.unsigned)
    }
    ,
    y.shl = y.shiftLeft,
    y.shiftRight = function (a) {
      return c(a) && (a = a.toInt()),
        0 == (a &= 63) ? this : 32 > a ? f(this.low >>> a | this.high << 32 - a, this.high >> a, this.unsigned) : f(this.high >> a - 32, this.high >= 0 ? 0 : -1, this.unsigned)
    }
    ,
    y.shr = y.shiftRight,
    y.shiftRightUnsigned = function (a) {
      if (c(a) && (a = a.toInt()),
        0 == (a &= 63))
        return this;
      var b = this.high;
      return 32 > a ? f(this.low >>> a | b << 32 - a, b >>> a, this.unsigned) : f(32 === a ? b : b >>> a - 32, 0, this.unsigned)
    }
    ,
    y.shru = y.shiftRightUnsigned,
    y.shr_u = y.shiftRightUnsigned,
    y.toSigned = function () {
      return this.unsigned ? f(this.low, this.high, !1) : this
    }
    ,
    y.toUnsigned = function () {
      return this.unsigned ? this : f(this.low, this.high, !0)
    }
    ,
    y.toBytes = function (a) {
      return a ? this.toBytesLE() : this.toBytesBE()
    }
    ,
    y.toBytesLE = function () {
      var a = this.high
        , b = this.low;
      return [255 & b, b >>> 8 & 255, b >>> 16 & 255, b >>> 24, 255 & a, a >>> 8 & 255, a >>> 16 & 255, a >>> 24]
    }
    ,
    y.toBytesBE = function () {
      var a = this.high
        , b = this.low;
      return [a >>> 24, a >>> 16 & 255, a >>> 8 & 255, 255 & a, b >>> 24, b >>> 16 & 255, b >>> 8 & 255, 255 & b]
    }
    ,
    b.fromBytes = function (a, c, d) {
      return d ? b.fromBytesLE(a, c) : b.fromBytesBE(a, c)
    }
    ,
    b.fromBytesLE = function (a, c) {
      return new b(a[0] | a[1] << 8 | a[2] << 16 | a[3] << 24, a[4] | a[5] << 8 | a[6] << 16 | a[7] << 24, c)
    }
    ,
    b.fromBytesBE = function (a, c) {
      return new b(a[4] << 24 | a[5] << 16 | a[6] << 8 | a[7], a[0] << 24 | a[1] << 16 | a[2] << 8 | a[3], c)
    }
  return b
})();

class LongWithBigInt {
}

module.exports = Long;