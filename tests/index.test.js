'use strict';

var Promise = require('es6-promise').Promise;
var expect = require('chai').expect;

var promiseAny = require('../index.js');

function promiseMethodFactory(ret) {
  return function() {
    return new Promise(function(resolve, reject) {
      resolve(ret);
    });
  };
}

var g = promiseMethodFactory('a'),
    h = promiseMethodFactory('b'),
    i = promiseMethodFactory(100),
    e = promiseMethodFactory(true);

describe('promiseAny', function(){
  it('it returns true if any methods pass the test', function(done){
    promiseAny([g, h, i, e], function(v) {
      return typeof v == 'number';
    }).then(function(result) {
      expect(result).to.be.true
      done();
    }).catch(done);
  });

  it('it returns true immediately for the first method to pass the test', function(done){
    promiseAny([i, g, h], function(value) {
      expect(value).to.eql(100);
      return typeof value == 'number';
    }).then(function(result) {
      expect(result).to.be.true
      done();
    }).catch(done);
  });

  it('it returns false if none of the methods pass the test', function(done){
    promiseAny([g, h, e], function(v) {
      return typeof v == 'number';
    }).then(function(result) {
      expect(result).to.be.false
      done();
    }).catch(done);
  });

  describe('input cases', function(){
    it('if given an empty array, returns false', function(done){
      promiseAny([], function(v) {
        expect(v).to.not.exist;
      }).then(function(result) {
        expect(result).to.be.false
        done();
      }).catch(done);
    });

    it('if given no callback, returns false', function(done){
      promiseAny([g]).then(function(result) {
        expect(result).to.be.false
        done();
      }).catch(done);
    });
  });
});