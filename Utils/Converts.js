function cvthex2ps(s) {
  var a = new Float32Array(1)
    , b = new DataView(a.buffer);
  b.setInt32(0, Number.parseInt(s, 16) | 0, true);
  return a[0]
}

exports.cvthex2ps = cvthex2ps;