const http = require('http')
  , fs = require('fs')
  , pl = require('path')
  , url = require("url")
var plugins = [];

function loadPlugin(path) {
  var p = require(path).trigger
    , result = plugins.indexOf(p);
  if (result >= 0)
    return plugins[result];
  else {
    plugins.push(p);
    return p
  }
}

function parseQuery(s) {
  var a = s.split('&'), result = {};
  for (var e of a) {
    var b = e.split("=");
    result[b[0]] = b[1]
  }
  return result
}

loadPlugin("./plugin-list.js");

const server = http.createServer((req, res) => {
  var reqUrl = url.parse(req.url);
  console.log(req.method + ": " + reqUrl.pathname);

  if (req.method == "GET") {
    var filePath = pl.join(
      __dirname,
      'Pages',
      reqUrl.pathname === '/' ? 'index.html' : reqUrl.pathname
    )
      , extname = pl.extname(filePath)
      , contentType = 'text/html';

    switch (extname) {
      case '.html':
      case '.htm':
        contentType = 'text/html';
        break;
      case '.js':
        contentType = 'text/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.json':
        contentType = 'application/json';
        break;
      default:
        contentType = 'application/octet-stream';
        break;
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = pl.join(filePath, 'index.html');
      contentType = 'text/html';
    }

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code == 'ENOENT') {
          // Not found
          console.log("File not found: " + filePath)
          fs.readFile(pl.join(__dirname, 'Pages', '404.html'), (err, content) => {
            res.writeHead(404, 'Not Found', { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          });
        } else {
          // Server internal error
          res.writeHead(500);
          console.error(error);
          res.end('Server Error');
        }
      } else {
        // Send file with specify MIME type
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  } else if (req.method == "POST") {
    if (reqUrl.pathname == "/load-plugin") {
      try {
        loadPlugin(parseQuery(reqUrl.query)["plugin-path"]);
        res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
        res.end(parseQuery(reqUrl.query)["plugin-path"], 'utf-8');
      } catch (e) {
        res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
        res.end("", 'utf-8');
      }
    } else
      for (var p of plugins) {
        if (p.url[reqUrl.pathname]) {
          res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
          res.end(p.url[reqUrl.pathname].main(parseQuery(reqUrl.query)), 'utf-8');
          break;
        }
      }
  }
});

const PORT = 9000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});