import babel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup'

const target = ( dest, format ) => {
  return { dest, format, moduleId: 'meg', moduleName: 'meg' }
}

var options = {
  entry: 'lib/meg.js',
  targets: [
    target('dist/meg-umd-es6.js', 'umd'),
    target('dist/meg-src-es6.js', 'es6')
  ]
}

if ( process.env.es5 ) {
  options.plugins = [babel(babelrc())]
  options.targets = [target('dist/meg-umd-es5.js', 'umd')]
}

export default options
