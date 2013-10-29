/*
 * fis
 * http://web.baidu.com/
 */

'use strict';

var coffee = require('coffee-script');

module.exports = function(content, file, conf){
    content = coffee.compile(content, conf);
    return conf.sourceMap ? content.js : content;
};