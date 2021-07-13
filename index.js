const md5 = require('md5');

// 一个 JavaScript 命名函数。
function WebpackContentMd5Hash() {
}

let fileObj = {};
// 在插件函数的 prototype 上定义一个 `apply` 方法。
WebpackContentMd5Hash.prototype.apply = function md5HashFunc(compiler) {
  // 指定一个挂载到 webpack 自身的事件钩子。
  compiler.plugin('shouldEmit', (compilation) => {
    compilation.chunks.forEach((chunk) => {
      // Webpack 会根据 Chunk 去生成输出的文件资源，每个 Chunk 都对应一个及其以上的输出文件
      // 例如在 Chunk 中包含了 CSS 模块并且使用了 ExtractTextPlugin 时，
      // 该 Chunk 就会生成 .js 和 .css 两个文件
      const files = chunk.files.map((filename) => {
        // compilation.assets 存放当前所有即将输出的资源
        // 调用一个输出资源的 source() 方法能获取到输出资源的内容
    
        if (fileObj[filename]) {
          return fileObj[filename];
        } 
        let source = compilation.assets[filename].source();
        let md5Hash = md5(source);
        md5Hash = md5Hash.slice(0, 8);
        const name = filename.split('.')[0];
        const suffix = filename.split('.')[1];
        const newName = `${name}.${md5Hash}.${suffix}`;
        compilation.assets[newName] = compilation.assets[filename];
        delete compilation.assets[filename];
        fileObj[filename] = newName;
        // console.log(newName);
        return newName;
      });
      
      chunk.files = files;
    });
    return true;
  });
};

module.exports = WebpackContentMd5Hash;