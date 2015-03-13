var _param = require('./param.json');

var sys = require('sys')
var exec = require('child_process').exec;
var child;

var pollInterval = _param.pollInterval || 3000;
var processes = _param.processes;

var _os = require('os');
var _source = _os.hostname();


function numProcessRunning(processName){
	child = exec("ps -ef | grep splunk | wc -l", function (error, stdout, stderr) {
        var proc = stdout - 2;
	var host = processName + "-" + _source;
	_source = host
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
