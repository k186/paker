const devFolder = 'dev';
const compileFolder = 'src';
const concatDir = [`${devFolder}/components/`];
const fs = require('fs');
const path = require('path');
let src = path.resolve(`./${devFolder}`)

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

function fixPathToKayak(url) {
  let name = url.replace(src, '').replace('.js', '')
  return name.substring(1, name.length).replace(/\\/g, "/")
}

function concatFile(baseOpt = {}) {
  let list = readFileList(src);
  let listOpt = []
  list.forEach(item => {
    //todo 这里只处理 concatDir index.js 和 非 concatDir的全js？？
    let dir = item.dir.replace(devFolder, compileFolder);
    let name = fixPathToKayak(item.path)

    listOpt.push({
      ...baseOpt,
      input: item.path,
      output: {
        ...baseOpt.output,
        dir,
        amd: {id: name},
        paths: ((id) => {
          return fixPathToKayak(id)
        })
      },
      external() {
        /*默认全部不打包，指定目录下的合并*/
        return true
      },
    })
  })
  return listOpt
}

concatFile()
module.exports = concatFile