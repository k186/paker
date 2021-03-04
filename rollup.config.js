import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import Str from "rollup-plugin-string";
import copy from 'rollup-plugin-copy'
const string = Str.string;
const concatdir = require('./concatdir.js')
const util = require('./utils');
const fixPath = util.fixPath;
const testPlugin = function () {
  let parseCode = ''
  let fileName = ''
  return {
    resolveFileUrl() {
    },//用来动态修改id
    renderChunk(code, chunk, options) {
      // fileName = chunk.fileName
      let funcReg = /[^.]function\s\((.+?)\)/g
      let depReg = /\[.*?\]/g
      let imports = chunk.imports;

      if (imports.length > 0) {
        //获取_interopDefaultLegacy 变量名
        let dependsStr = code.match(funcReg)[0].match(/\(.*\)/g)[0];
        let dependsVar = dependsStr.substring(1, dependsStr.length - 1).split(',')

        //console.log(dependsVar)
        let depends = []
        for (let i = 0; i < imports.length; i++) {
          depends.push(fixPath(imports[i]))
        }
        //去掉dep
        code = code.replace(depReg, '')//去掉dep
          .replace(', , function', ', function')
        //下面这种可能不存在
        for (let i = 0; i < dependsVar.length; i++) {
          let tempReg
          if (code.indexOf('_interopDefaultLegacy(') > -1) {
            tempReg = `_interopDefaultLegacy(${dependsVar[i].trim()})`
            code = code.replace(funcReg, 'function(require,exports,module)')// 参数替换
              .replace(tempReg, `_interopDefaultLegacy(require("${depends[i]}"))`)
          } else {
            tempReg = new RegExp(`${dependsVar[i].trim()}\.`, 'g')
            code = code.replace(funcReg, 'function(require,exports,module)')// 参数替换
              .replace(tempReg, `require("${depends[i]}").`)
          }
        }
      }

      return code.replace("['exports'],", '')//去掉exports
        //普通模块seajs exports
        .replace(/exports\./g, 'module.exports.')
        .replace(funcReg, 'function(require,exports,module)')// 参数替换
        //es module 兼容
        .replace("(exports,", "(module.exports,")
        .replace("'default' in e ? e : { 'default': e }", "'default' in e ? e.default : e")
    },
  }
}
const baseOpt = {
  watch: {
    exclude: 'node_modules/**',
    include: 'dev/**'
  },
  output: {
    format: 'amd', /*'iife',*/
    strict: false,
    exports: 'auto'
    //compact: true /*mini*/
  },
  context: 'window',
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      exclude: ['node_modules/**', '**/*.tpl'] // 只编译我们的源代码
    }),
    string({
      include: "**/*.tpl",
    }),
    copy({
      targets:[
        {src:'dev/**/*.tpl',dest:'src/**/*.tpl'}
      ]
    }),
    testPlugin()
  ]
}

export default concatdir(baseOpt)