/* jshint node:true,mocha:true,expr:true */
'use strict';

var simpleRubyParser = require('../lib/simple_ruby_parser.js');
var should = require('should');

describe('simple_ruby_parser', function() {
  describe('defined', function() {
    it('should be an object', function() {
      simpleRubyParser.should.be.Object;
    });
  });
});
