# Promise Any Series

Given an array of methods that return promises, execute in series and return true if any satisfy a test.

This library is useful when having a set of prioritized promises to check, and you'd like to test the fast(cheap) calls first, short circuiting after the first one to pass a test.

For example, if you needed to check several conditions, involving synchronous code(fast), local database calls(less fast), and third party services(slow), you'd want to execute the fast one first, followed by the slower ones, and so forth.

## Installation
```$ npm install promise-any-series```

## Basic Usage

```javascript
var anySeries = require('promise-any-series');

var superFast = function() {
  return new Promise(function(resolve, reject) {
    console.log('superFast ran!');
    resolve('foo');
  });
};

var sortaSlow = function() {
  return new Promise(function(resolve, reject) {
    console.log('sortaSlow ran!');
    resolve(100);
  });
};

var superDuperSlow = function() {
  return new Promise(function(resolve, reject) {
    console.log('superDuperSlow ran!');
    resolve('bar');
  });
};

anySeries([superFast, sortaSlow, superDuperSlow], function(value) {
  return typeof value == 'number'; //the first promise to pass the test will immediately resolve true
}).then( (result) => {
  console.log(result);
});
```
This will print:
```javascript
superFast ran!     //does not pass test
sortaSlow ran!     //passes test
true               //note that superDuperSlow did not run
```

## Inputs
Empty arrays or failing to provide a valid callback immediately resolve as false.
```javascript
anySeries([]).then(function(data) {
  console.log(results); //false
});
```
This will print:
```javascript
false
```