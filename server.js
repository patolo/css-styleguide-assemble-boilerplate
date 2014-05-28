#!/usr/bin/env node
/*jslint node: true */

var connect = require('connect');
var http = require('http');
var path = require('path');
var ping = require('http-ping');
var debuggable = require('debuggable');

var staticDir = path.join(__dirname, '_gh_pages');

console.log(staticDir);

var app = connect()
    .use(connect.logger('dev'))
    .use(debuggable)
    .use(ping.middleware({}, []))
    .use(connect.static(staticDir));

http.createServer(app).listen(process.env.PORT || 3000);
