require('babel-polyfill');
var testsContext = require.context('.', true, /-test$/);
testsContext.keys().forEach(testsContext);