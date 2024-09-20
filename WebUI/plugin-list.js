const fs = require("fs")
  , pl = require("path");

function main() {
  var ls = fs.readdirSync(pl.join(__dirname, "Pages")), result = [];
  for (var f of ls) {
    var path = pl.join(__dirname, "Pages", f);
    if (fs.existsSync(path) && fs.statSync(path).isDirectory()) {
      result.push(f)
    }
  }

  return JSON.stringify(result)
}

exports.trigger = {
  url: {
    "/file-list": {
      main: main
    }
  }
}