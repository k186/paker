import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const concatdir = require('./concatdir.js')

const baseOpt = {
  external: ['../../utils/util'],
  output: {
    dir: 'dist',
    format: 'amd', /*'iife',*/
    strict: false,
    exports: 'auto',
    paths: {
      '../../utils/util': 'paker/utils/util'
    }
    //compact: true /*mini*/
  },
  context: 'window',
  plugins: [

    nodeResolve(),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: 'node_modules/**',  // Default: undefined
    }),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    })
  ]
}

export default concatdir(baseOpt)