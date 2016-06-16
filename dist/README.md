This directory contains bundled versions of Meg to use on various platforms:

###### es6

Using entry [`dist/meg-umd-es6.js`](./meg-umd-es6.js):

  * Node.js 6+
  * Latest browsers (2016+)
  * NW.js 0.15+
  * Electron 1+

Using entry [`lib/meg.js`](../lib/meg.js) or [`dist/meg-src-es6.js`](./meg-src-es6.js):

  * as a module: Node.js 4+ and NPM package `babel-register` 6+
  * building: Babel 6+
  * bundling: rollup 0.30+ and Babel 6+

###### es5

Using entry [`dist/meg-umd-es5.js`](./meg-umd-es5.js):

  * Node.js
  * ES5 browser (2009+)
  * node-webkit/NW.js
  * Atom Shell/Electron
