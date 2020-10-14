const { exec } = require('child_process');

function run(req,res) {
  const ls = exec('/HelloWorld/HelloWorld', function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: '+error.code);
      console.log('Signal received: '+error.signal);
    }
    console.log('Child Process STDOUT: '+stdout);
    console.log('Child Process STDERR: '+stderr);
  });
  
  ls.on('exit', function (code) {
    console.log('Child process exited with exit code '+code);
  
  
    var response = [
      {
        "message": 'Child process exited with exit code '+code
      }
    ];  
    res.statusCode = 200;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(response));
  
  });
  
}


export default run;