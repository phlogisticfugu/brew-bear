/* jshint node:true */
'use strict';

/**
 * Parse a Ruby class in a manner that produces a pseudo-AST
 * which is simple to parse
 * TODO may later try to find or make an external lib to do this
 * for now just doing this simply to pull out parameters
 */
function parseRuby (rubyCode) {
  var rubyCodeLines = rubyCode.split( /[\r\n]/ );
  
  if (rubyCodeLines[0].startsWith('class')) {
    return parseAndAppendClass(rubyCodeLines, 0, 0);
  } else {
    throw new Error('unable to parse: ' + rubyCode);
  }
}

function parseAndAppendClass (rubyCodeLines, lineIndex, indentationDepth) {
  var currentLine = rubyCodeLines[lineIndex];
  var classRegExp = /^class (\w+)(?: \u003C (\w+))?$/;
  var parsedAst = {
    type: 'class'
  };
  
  /*
   * Account for indentation
   */
  if ((indentationDepth > 0) && currentLine.startsWith(' '.repeat(2 * indentationDepth))) {
    currentLine = currentLine.slice(2 * indentationDepth);
  }
  
  var matchResult = classRegExp.exec(currentLine);
  
  /**
   * Match the first line
   */
  if (null !== matchResult) {
    parsedAst.name = matchResult[1];
    
    if (matchResult[2]) {
      parsedAst.parentName = matchResult[2];
    }
  } else {
    /**
     * Not a class
     */
    return false;
  }
  
  /**
   * Match last line
   */
  
  
  return parsedAst;
}

module.exports = {
  parseRuby: parseRuby
};
