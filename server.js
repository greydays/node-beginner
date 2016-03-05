'use strict';

var http = require('http');
var url = require('url');

function start(route, handle){
  function onRequest(request, response){

    // kills annoying favicon console messages https://gist.github.com/kentbrew/763822
    if (request.url === '/favicon.ico') {
      response.writeHead(200, {'Content-Type': 'image/x-icon'} );
      response.end();
      return;
    }

    var pathname = url.parse(request.url).pathname;
    console.log('Request for ' + pathname + 'received.');
    route(handle, pathname, response, request);
  }

  http.createServer(onRequest).listen(8888);
  console.log('Server has started on port 8888');
}

exports.start = start;


