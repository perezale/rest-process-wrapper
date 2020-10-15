import * as cp from 'child_process';
import * as path from 'path';

const exec = cp.exec;
const binaryPath = process.env.BINARY_PATH ?? '/app/application';

export default class ProcessManager{

  public binaryPath = binaryPath;
  protected processId : string | null = null;

  handle() {
    let _this= this;

    const childProcessObj = exec(this.binaryPath, function (error, stdout, stderr) {
      if (error) {
        console.log(error.stack);
        console.log('Error code: '+error.code);
        console.log('Signal received: '+error.signal);
      }
      console.log('Child Process STDOUT: '+stdout);
      console.log('Child Process STDERR: '+stderr);
    });

    let basename = path.basename(this.binaryPath);
    console.log(basename);
    this.processId = basename;
    
    childProcessObj.on('exit', function (code) {
      console.log('Child process exited with exit code '+code);
  
      _this.processId = null;
    });

    return true;    
  }

  isRunning = (cb: any) => {
    console.log(this.processId);

    if (!this.processId || this.processId == null) cb(false);

    let platform = process.platform;
    let cmd = '';
    switch (platform) {
        case 'win32' : cmd = `tasklist`; break;
        case 'darwin' : cmd = `ps -ax | grep ${this.processId}`; break;
        case 'linux' : cmd = `ps -A`; break;
        default: break;
    }
    exec(cmd, (err, stdout, stderr) => {
        let pid = this.processId;
        if (pid) {
          cb(stdout.toLowerCase().indexOf(pid) > -1);
        }
        cb(false);
    });
  }
  
  
}