const devFolder = 'dev';
const compileFolder = 'src';
const concatDir = [`/components/`, `/pages/`];
const fs = require('fs');
const path = require('path');
const util = require('./utils');
const src = util.src;
const fixPath = util.fixPath;

function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((item, index) => {
    var fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      //如果是 合并目录则 不用往下了
      readFileList(path.join(dir, item), filesList);  //递归读取文件
    } else {
      filesList.push({name: item, path: fullPath, dir});
    }
  });
  return filesList;
}


function concatFile(baseOpt = {}) {
  let list = readFileList(src);
  let listOpt = []
  list.forEach(item => {
    //todo 这里只处理 concatDir index.js 和 非 concatDir的全js？？
    let dir = item.dir.replace(devFolder, compileFolder);
    let name = fixPath(item.path)

    listOpt.push({
      ...baseOpt,
      input: item.path,
      output: {
        ...baseOpt.output,
        dir,
        amd: {id: name},
        paths: ((id) => {
          return fixPath(id)
        }),
        sourcemap: false
      },
      external(id, parentId,) {
        /**
         * node_modules 待处理
         * concatDir  合并
         * */
        let url = fixPath(parentId)
        let result = true;
        for (let i = 0; i < concatDir.length; i++) {
          if (url.indexOf(concatDir[i]) > -1) {
            result = true
            break;
          }
        }
        //tpl 直接合并到js
        let isTpl = id.split('.')
        if (isTpl[isTpl.length - 1] === 'tpl') {
          result = false
        }
        return result
      },
    })
  })
  return listOpt
}

concatFile()
module.exports = concatFile