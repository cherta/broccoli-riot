var mergeTrees = require('broccoli-merge-trees');
var compileRiotTags = require('./');

var riotTags = compileRiotTags('test/fixtures', {
  srcDir: '/'
});

module.exports = mergeTrees([riotTags]);