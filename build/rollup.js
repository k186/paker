import * as rollup from 'rollup'
import path from 'path'
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import seaTransform from "./transformsea.js";

var __dirname = path.resolve(path.dirname(''));
var project = path.resolve(__dirname, './');
var root = path.resolve(project, 'src');


const inputOptions = {
  input: path.normalize(`${root}/index.js`),
  
  external (id, parentId) {
    //['/node_modules/',]
    console.log(path.normalize(id))
    return true
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      exclude: ['node_modules/**'] // 只编译我们的源代码
    }),
    seaTransform({
      projectRoot: path.resolve(path.dirname('../../'))
    })
  ]
}

const watcher = rollup.watch({
  ...inputOptions,
  output: {
    format: 'amd',
    file: 'dist/index.js',
    strict: false
  },
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**'
  }
});
watcher.on('event', event => {
  console.log(event)
})
