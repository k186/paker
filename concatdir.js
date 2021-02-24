const concatDir = ['src/components/'];
const fs = require('fs');
const path = require('path');
let src = path.resolve('./src')

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
    let dir = item.dir.replace('src', 'dist');
    let name = item.path.replace(path.resolve('./'), '').replace('.js', '')
    name = name.substring(1, name.length).replace(/\\/g,"/")
    listOpt.push({...baseOpt, input: item.path, output: {...baseOpt.output, dir, amd: {id: name}}})
  })
  return listOpt
}

concatFile()
module.exports = concatFile