var _param = require('./param.json');

var sys = require('sys')
var exec = require('child_process').exec;
var child;

var pollInterval = _param.pollInterval || 3000;
var processes = _param.processes;

var _os = require('os');
var _source = _os.hostname();


function numProcessRunning(processName){
	var searchCommand = "ps -ef | grep " + processName + " | wc -l";
	child = exec(searchCommand, function (error, stdout, stderr) {
        var proc = stdout - 3;
	var host = processName + "-" + _source;
        console.log('BOUNDARY_PROCESS_RUNNING %d %s', proc, host);
	});
}


function poll()
{
	for(var i = 0; i < processes.length; i++)
	{
		numProcessRunning(processes[i]);
	}
}

setInterval(poll, pollInterval);
