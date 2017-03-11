#!/usr/bin/env node

'use strict'

/*--------- 1) Dependencies ---------*/

var builtin = require( 'builtin-modules' )
var rollup = require( 'rollup' ).rollup
var include = require( 'rollup-plugin-includepaths' )
var json = require( 'rollup-plugin-json' )
var buble = require( 'rollup-plugin-buble' )
var readFile = require( 'fs' ).readFileSync

/*--------- 2) Options and data ---------*/

var meta = require( '../package.json' )

var HEADER = readFile( 'src/banner.js', 'utf8' )

  .replace( '##VERSION', meta.version )
  .replace( '##BUILDTIME', new Date() )

var config = {

  buble: { exclude: 'node_modules/**' },

  include: {

    external: [].concat(

      builtin,
      meta.dependencies,
      meta.devDependencies

    ),

    paths: [ 'src' ]

  }

}

/*--------- 3) Utilities ---------*/

function die( err ) {

  console.error( err.stack || err.message || err )
  process.exit( 1 )

}

function target( dest, format, sourceMap ) {

  return {

    dest: dest,
    format: format != void 0 ? format : 'umd',
    sourceMap: sourceMap != void 0 ? sourceMap : true,
    moduleId: meta.name,
    moduleName: meta.name,
    banner: HEADER

  }

}

function generate( entry, es5, targets ) {

  var plugins = [ include( config.include ), json() ]

  if ( es5 ) plugins.push( buble( config.buble ) )

  rollup( {

    entry: entry,

    plugins: plugins

  } )

  .catch( die )

  .then( function create( bundle ) {

    targets.forEach( function write( options ) {

      bundle.write( options ).catch( die )

    } )

  } )

}

/*--------- 4) Bundler ---------*/

generate( 'src/meg/index.js', true, [

  target( 'dist/meg.es5-umd.js', 'umd', 'inline' )

] )

generate( 'src/meg/index.js', false, [

  target( 'dist/meg.source-es.js', 'es' ),

  target( 'dist/meg.source-umd.js' )

] )

generate( 'src/spec/index.js', true, [

  target( 'test/spec.es5.js', 'iife' )

] )

generate( 'src/spec/index.js', false, [

  target( 'test/spec.source.js', 'iife' )

] )
