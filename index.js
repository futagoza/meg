'use strict'

module.exports = require(

  process.version.split( '.' )[ 0 ].charAt( 1 ) < 6

    ? './dist/meg.es5-umd.js'

    : './dist/meg.source-umd.js'

)
