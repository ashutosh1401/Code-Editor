const {spawn} = require('child_process')
const Runner = require('./Runner')
const path = require('path')

class RunnerPy extends Runner {
    defaultFile() {
        return this.defaultfile
    }

    constructor() {
        super();
        this.defaultfile = 'Hello.py'
    }

    run(file,directory,filename,extension,callback) {
        if(extension.toLowerCase()!=='.py') {
            console.log(`${file} is not a py file.`);
            return;
        }
        this.execute(file,directory,callback)
    }

    execute(file,directory,callback) {
        const options = {cwd: directory}
        const argsRun = []
        argsRun[0] = file
        console.log(`options: ${options}`);
        console.log(`argsRun: ${argsRun}`);

        const executor = spawn('py',argsRun,options);

        executor.stdout.on('data', (output) => {
            console.log(String(output));
            callback(0,String(output)); // No Error
        })

        executor.stderr.on('data',(output) => {
            console.log(String(output));
            callback(2,String(output)); // No Error
        })

        executor.on('close', (output) => {
            this.log(`stdout: ${output}`);
        })
    }

    log(message) {
        console.log(message);
    }
}

module.exports = RunnerPy