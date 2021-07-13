# webpack-content-md5-hash

[![NPM](https://nodei.co/npm/webpack-md5-hash.png)](https://npmjs.org/package/webpack-md5-hash)

Plugin to generate a hash based on output file's content with md5.

## Installation

```
npm install webpack-content-md5-hash --save-dev
```

## Usage

Just add this plugin as usual.

``` javascript

// webpack.config.js

var WebpackContentMd5Hash = require('webpack-content-md5-hash');

module.exports = {
    // ...
    plugins: [
        new WebpackContentMd5Hash()
    ]
};

```

