const devFolder = 'dev';
const path = require('path');
const src = path.resolve(`./${devFolder}`)

function fixPath(url) {
  let name = url.replace(src, '').replace('.js', '')
  return name.substring(1, name.length).replace(/\\/g, "/")
}

module.exports = {
  fixPath,
  src,
  devFolder
}