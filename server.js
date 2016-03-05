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

    var postData = '';
    var pathname = url.parse(request.url).pathname;
    console.log('Request for ' + pathname + 'received.');

    request.setEndcoding('utf8');

    request.addListener('data', function(postDataChunk) {
      postData += postDataChunk;
      console.log('Received POST data chunk "' + postDataChunk + '."');
    });

    request.addListener('end', function(){
      route(handle, pathname, response, postData);
    });

    route(handle, pathname, response);
  }

  http.createServer(onRequest).listen(8888);
  console.log('Server has started on port 8888');
}

exports.start = start;

