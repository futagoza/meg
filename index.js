'use strict';

var meg

function tryRequire ( module, tryBabel ) {
  try {
    if ( !meg ) {

      if ( tryBabel ) {
        require('babel-register')
      }

      meg = require(module)
      
    }
  } catch ( e ) {}
}

tryRequire('./dist/meg-umd-es6.js')
tryRequire('./dist/meg-umd-es5.js')
tryRequire('./dist/meg-src-es6.js', true)
tryRequire('./lib/meg.js', true)

if ( typeof meg === 'undefined' ) {
  throw new Error('unable to find (or require) entry for Meg')
}

module.exports = meg
