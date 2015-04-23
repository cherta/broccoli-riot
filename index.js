'use strict';

var fs = require('fs');
var path = require('path');
var mkpath = require('mkpath');
var Writer = require('broccoli-writer');
var riotCompiler = require('riot/compiler');
var walkSync = require('walk-sync');
var xtend = require('xtend');

function RiotCompiler (inputTree, options) {
  
  if (!(this instanceof RiotCompiler)) {
    return new RiotCompiler(inputTree, options);
  }

  this.inputTree = inputTree;
  this.options = options || {};
}

function compile (filepath) {
  return { name: filepath, content: riotCompiler.compile(fs.readFileSync(filepath, 'utf-8')) };
}

function isTagFile (filepath) {
  return path.extname(filepath).toLowerCase() === '.tag';
}

RiotCompiler.prototype = Object.create(Writer.prototype);
RiotCompiler.prototype.constructor = RiotCompiler;

RiotCompiler.prototype.write = function (readTree, destDir) {
  
  var options = xtend({outDir: destDir}, this.options);

  if (this.options.outDir) {
    options.outDir = path.resolve(destDir, options.outDir);
  }

  return readTree(this.inputTree).then(function(srcDir) {

    walkSync(srcDir)
      .filter(isTagFile)
      .map(function (filepath) {
        return path.resolve(srcDir, filepath);
      })
      .map(compile)
      .forEach(function (fileData) {
        var relativeFile = path.relative(srcDir, fileData.name);
        var filename = path.basename(relativeFile).replace('.tag', '.js');

        var absoluteFolder = path.dirname(path.resolve(options.outDir, relativeFile));
        var absoluteFile = path.resolve(absoluteFolder, filename);
        
        mkpath.sync(absoluteFolder);

        fs.writeFileSync(absoluteFile, fileData.content);
      });
    
  });
};

module.exports = RiotCompiler;
