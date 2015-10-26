'use strict'

var Promise = require('es6-promise').Promise
var promiseSeries = require('promise-series-node')

module.exports = function (array, testCallback) {
  return new Promise(function (resolve, reject) {
    if (!(testCallback instanceof Function)) {
      return resolve(false)
    }
    if (!(array instanceof Array) || !array.length) { // empty/non arrays can't pass any test
      return resolve(false)
    }
    var cb = function (input) {
      return !testCallback(input) // if the input tests 'true', tell promise-series to halt
    }
    promiseSeries(array, cb).then(function (results) {
      // have to double check last result, since promise-series will return
      // the halt-condition's failure value in the results.
      resolve(testCallback(results[results.length - 1]))
    })
  })
}
