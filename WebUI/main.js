const http = require('http')
  , fs = require('fs')
  , pl = require('path')
  , plugin = require("../WorldGeneration/TheEndGenerator/test.js").trigger;

console.log(plugin)

const server = http.createServer((req, res) => {
  console.log(req.method + ": " + req.url);

  if (req.method == "GET") {
    let filePath = pl.join(
      __dirname,
      req.url === '/' ? 'index.html' : req.url
    );

    let extname = pl.extname(filePath);
    let contentType = 'text/html';
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

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code == 'ENOENT') {
          // Not found
          console.log("File not found: " + filePath)
          fs.readFile(pl.join(__dirname, 'public', '404.html'), (err, content) => {
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
    if (req.url == plugin.url) {
      res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
      res.end(plugin.main(), 'utf-8');
    }
  }
});

const PORT = 9000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});