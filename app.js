
const http = require('http');
const run = require('./exec');
const process = require('process');

const { default: run } = require('./exec');
const { default: isRunning } = require('./isRunning');

http.createServer(function (req, res) {
  
  const { method, url, headers } = request

  // [2]
  if (method === "POST" && url === "/run") {
    run(req,res);
  }

  if (method === "GET" && url === "/isRunning") {
    isRunning
  }

  
}).listen(3000, '0.0.0.0', () => {
  console.log('Running server at port 3000');
});



process.on('SIGINT', () => {
  console.info("Interrupted")
  process.exit(0)
})

