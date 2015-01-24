'use strict';

var assert = require('assert');
var path = require('path');
var readFiles = require('read-files-promise');

function compareFiles(filename) {
  return readFiles([
    path.resolve('test/actual/', filename),
    path.resolve('test/expected/', filename)
  ], {encoding: 'utf-8'}).then(function(bufs) {
    assert.strictEqual(bufs[0], bufs[1]);
  });
}

describe('broccoli-riot', function() {
  it('should compile .tag templates to JavaScript.', function() {
    return compareFiles('todo.js');
  });

  it('should mimic the same folder structure', function() {
    return compareFiles('todoapp/todo.js');
  });
});