'use strict';

const Mocha = require('mocha')
const ms = require('mocha/lib/ms')
const hr = require('pretty-hrtime')

const BaseReporter = Mocha.reporters.Base
const { color, cursor, symbols } = BaseReporter
const joinPaths = require('path').join

BaseReporter.colors.red = 31
BaseReporter.colors.yellow = 33
BaseReporter.colors.cyan = 36

var appName = ''
const MochaVersion = require('mocha/package.json').version

try {

  let __package = require(joinPaths(process.cwd(), 'package.json'))

  appName = `${ __package.name } v${ __package.version }, `

} catch ( e ) { }

class Spec2 extends BaseReporter {

  constructor ( runner ) {

    super(runner)

    var indents = 1, lastSuite = null
    const stats = this.stats

    const indent = () => Array(indents).join('  ')
    const print = message => process.stdout.write(`${ message }\n`)
    const hr2ms = hrtime => hr(hrtime, { precise:true })

    runner.on('start', () => {
      print(`\n  ${ color('yellow', appName + 'Mocha v' + MochaVersion) }\n`)
    })

    runner.on('suite', suite => {
      if ( suite.title.length > 0 ) {
        ++indents
        if ( lastSuite !== suite.title ) {
          if ( lastSuite ) print()
          lastSuite = suite.title
          print(indent() + color('suite', lastSuite + '\n'))
        }
      }
    })

    runner.on('suite end', () => --indents)

    runner.on('pending', test => {
      print(indent() + color('pending', '  - ' + test.title))
    })

    runner.on('test', test => test.starthr = process.hrtime())

    runner.on('pass', test => {
      let message = indent()
      message += color('checkmark', '  ' + symbols.ok)
      message += color('pass', ' ' + test.title)
      message += color('red', ` (${ hr2ms(process.hrtime(test.starthr)) })`)
      cursor.CR()
      print(message)
    })

    runner.on('fail', test => {
      cursor.CR()
      print(indent() + color('fail', `  ${ stats.failures }) ` + test.title))
    })

    runner.on('end', () => {
      var message = '\n'

      message += '  '
      message += color('cyan', stats.suites + ' suites,')
      message += color('cyan', ` with ${ stats.tests } tests`)
      message += '\n'

      message += color('bright pass', ' ')
      message += color('green', ` ${ stats.passes || 0 } passing`)
      message += color('light', ` (${ ms(stats.duration) })`)
      message += '\n'

      if ( stats.pending ) {
        message += color('pending', ' ')
        message += color('pending', ` ${ stats.pending } pending`)
        message += '\n'
      }

      print(message)

      if ( stats.failures ) {
        print(color('fail', `  ${ stats.failures } failing`))
        BaseReporter.list(this.failures)
        print()
      }
    })

  }

}

module.exports = Spec2
