import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const concatdir = require('./concatdir.js')

const baseOpt = {
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
      exclude: 'node_modules/**' // 只编译我们的源代码
    })
  ]
}

export default concatdir(baseOpt)