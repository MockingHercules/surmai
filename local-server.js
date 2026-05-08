/*
  Optional local preview server.
  Run with: node local-server.js
  Then open: http://127.0.0.1:5500
*/

const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = 5500;

const contentTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
};

const server = http.createServer((request, response) => {
  const cleanUrl = decodeURIComponent(request.url.split("?")[0]);
  const requestedPath = cleanUrl === "/" ? "index.html" : cleanUrl;
  const filePath = path.join(root, requestedPath);

  // Keep the server from reading files outside this project folder.
  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream",
    });
    response.end(data);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Surmai running on http://127.0.0.1:${port}`);
});
