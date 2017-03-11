'use strict'

var Mocha = require( 'mocha' )
var path = require( 'path' )

var mocha = new Mocha( {

  'ui': 'bdd',
  'reporter': 'spec',
  'timeout': 30000

} )

mocha.addFile(

  process.version.split( '.' )[ 0 ].charAt( 1 ) < 6

    ? path.join( __dirname, 'spec.es5.js' )

    : path.join( __dirname, 'spec.source.js' )

)

mocha.run( process.exit )
