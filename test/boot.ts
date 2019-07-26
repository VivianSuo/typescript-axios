const JasmineCore = require('jasmine-core');
export interface Global{
  document:Document;
  window:Window;
  getJasmineRequireObj:any;
}
declare var global:Global
global.getJasmineRequireObj = function(){
  return JasmineCore
}
require('jasmine-ajax')