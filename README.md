# broccoli-riot

[riot](https://github.com/muut/riotjs) compiler for [Broccoli](https://github.com/broccolijs/broccoli)

## Note

I'm new to Broccoli and riot as well but I feel the need to learn both, and there is no better way to learn that building something you need. As you may guess this plugin is far from perfect so please, please if you find a bug open a PR!.

This project is heavily inspired, maybe more like a copy & adapt thing on [broccoli-typescript](https://github.com/shinnn/broccoli-typescript) so kudos to [Shinnosuke Watanabe](https://github.com/shinnn).

## Installation

Install with [npm](https://www.npmjs.org/). (Make sure you have installed [Node](http://nodejs.org/).)

```
npm i --save-dev broccoli-riot
```

## Example

```javascript
var compileRiotTags = require('broccoli-riot');
tree = compileRiotTags(tree, options);
```

## API

### compileRiotTags(tree[, options])

#### options.outDir

Type: `String` Default: Build target directory

Output compiled files to the directory. 

## License

Copyright (c) 2014 [Gabriel Chertok](https://github.com/cherta)

Licensed under [the MIT License](./LICENSE).