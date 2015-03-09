
var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({port: 3000});

// standard load an index file so you can click on things with your browser and 'see' the changes, as opposed to tests
server.route({
  method: 'GET',
  path: '/',
  handler: {
    file: 'index.html'
  }
});


// a 'hard-wired' path that proxies a specific uri
server.route({
  method: '*',
  path: '/proxy-simple',
  handler: {
    proxy: {
      uri: 'http://www.wookets.com/'
    }
  }
});


// a 'catch-all' path that proxies a specific url
server.route({
  method: '*',
  path: '/proxy-catch-all/{path*}',
  handler: {
    proxy: {
      uri: 'http://www.wookets.com/'
    }
  }
});


// an 'appendable' path that proxies a specific url
server.route({
  method: '*',
  path: '/proxy-appendable/{path*}',
  handler: {
    proxy: {
      passThrough: true,
      mapUri: function (request, callback) {
        var path = request.path.replace('/proxy-appendable/', ''); // strip out proxy path if wanted
        callback(null, 'http://www.wookets.com/' + path);
      }
    }
  }
});


server.start(function () {
  server.log('info', 'Server running at: ' + server.info.uri);
});
