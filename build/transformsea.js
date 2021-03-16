/**
 * Created by k186 on 2021/3/16.
 * Name:
 * GitHub:
 * Email: k1868548@gmail.com
 */
import path from 'path'

function pathToPathName (path, root, extName) {
  return path.replace(root + '\\', '')
             .replace(extName, '')
             .replace(/\\/g, "/")
}

export default function seaTransform (opt = {}) {
  let seaTransformOpt = opt;
  return {
    name: 'seaTransform',
    renderChunk (code, chunk, options) {
      let finalCode = code;
      const argsRegex = /\(([^(]+?)\)/;
      const depRegex = /\[.*?\]/;
      
      // replace dep
      if (!seaTransformOpt.projectRoot) {
        throw new Error(`This plugin need projectRoot config.`);
      }
      var extName = path.extname(chunk.facadeModuleId)
      var fileName = pathToPathName(chunk.facadeModuleId, seaTransformOpt.projectRoot, extName)
      finalCode = finalCode.replace(finalCode.match(depRegex)[ 0 ], `'${fileName}'`)
      
      //replace exports
      finalCode = finalCode.replace(/\bexports\b/g, "module.exports")
      
      
      const args = finalCode.match(argsRegex)[ 1 ];
      // 获取引入变量
      // 需要忽略'module.exports'
      const varArgs = args.split(/,/g).filter(a => {
        if (a !== 'module.exports') {
          return a.trim()
        }
      });
      
      // replace function args
      finalCode = finalCode.replace(args, 'require, exports, module');
      
      const imports = chunk.imports;
      for ( var i = 0; i < varArgs.length; i++ ) {
        let varArgRegex = new RegExp(`\\(${varArgs[ i ].trim()}\\)`, 'g')
        //todo 这里如何处理 node_modules
        finalCode = finalCode.replace(varArgRegex, `(require('${pathToPathName(imports[ i ], seaTransformOpt.projectRoot, extName)}'))`)
      }
      return finalCode
    }
  }
}