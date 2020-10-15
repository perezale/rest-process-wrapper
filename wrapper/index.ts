
import ProcessManager from "./src/processManager";
import http = require('http');

const pm = new ProcessManager();

http.createServer(function (req, res) {
  
  const { method, url, headers } = req;

  res.setHeader('content-Type', 'Application/json');

  let handled = false;
  if (method === "POST" && url === "/run") {
    handled = true;
    if (pm.handle()) {

      var response = {
          "message": 'Child process started successfully'
      };  
      res.statusCode = 200;
      res.end(JSON.stringify(response));
    }
  }

  if (method === "GET" && url === "/status") {
    handled = true;
    pm.isRunning(function (result: any) {
        var response = {
          "message": result ? 'running' : 'stopped'
        };
        res.statusCode = 200;
        res.end(JSON.stringify(response));
      });
  }

  if(!handled) {
    res.statusCode = 400;
    res.end(JSON.stringify("Not supported"));
  }

}).listen(3000, '0.0.0.0', () => {
  console.log('Running server at port 3000');
});



process.on('SIGINT', () => {
  console.info("Interrupted")
  process.exit(0)
})

