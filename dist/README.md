This directory contains bundled versions of Meg to use on various platforms:

###### es5

Using entry [`dist/meg.es5-umd.js`](./meg.es5-umd.js):

  * Node.js
  * ES5 browser (2009+)
  * node-webkit/NW.js
  * Atom Shell/Electron

###### es6 / es2015

Using entry [`dist/meg.source-umd.js`](./meg.source-umd.js):

  * Node.js 6+
  * Latest browsers (2016+)
  * NW.js 0.15+
  * Electron 1+

Using entry [`src/meg/index.js`](../src/meg/index.js) or [`dist/meg.source-es.js`](./meg.source-es.js):

  * as a module: Node.js 4+ and NPM package `buble/register` 0.15+
  * building: buble 0.15+
  * bundling: rollup 0.41+ and buble 0.15+
