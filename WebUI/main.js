const http = require('http')
  , fs = require('fs')
  , pl = require('path')
  , url = require("url")
const OCTET_STREAM = { 'Content-Type': 'application/octet-stream' };
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
          console.error(error);
          res.writeHead(500).end(error.message, 'uft-8');
        }
      } else
        // Send file with specify MIME type
        res.writeHead(200, { 'Content-Type': contentType }).end(content, 'utf-8');
    });
  } else if (req.method == "POST") {
    // Load plugin instruction
    if (reqUrl.pathname == "/load-plugin") {
      try {
        loadPlugin(parseQuery(reqUrl.query)["plugin-path"]);
        res.writeHead(200).end();
      } catch (e) {
        res.writeHead(404).end(e.message, 'utf-8');
      }
    } else {
      // Plugin request
      for (var p of plugins)
        if (p.url[reqUrl.pathname]) {
          var result;
          try {
            result = p.url[reqUrl.pathname].main(reqUrl.query ? parseQuery(reqUrl.query) : null);
            res.writeHead(200).end(result, 'utf-8');
          } catch (e) {
            res.writeHead(500).end(e.message, 'utf-8');
          }
          return
        }
      res.writeHead(404).end();
    }
    
  }
});

const PORT = 9000;
server.listen(PORT, () => {
  console.log(`WebUI server is running on port ${PORT}.`);
});