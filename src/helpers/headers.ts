import { isPlainObject } from './util'
// 针对content-type的headers属性进行操作，1、对headers中没有content-type项的添加content-type，2、对有content-type项的将不规范的书写方式进行规范化
export function processHeaders(headers:any,data:any):any{
  // debugger;
  normalizeHeaderName(headers,'Content-Type')
  if(isPlainObject(data)){
    if (headers && !headers['Content-Type']){
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

function normalizeHeaderName(headers:any,normalizeName:string):void{
  if(!headers){
    return
  }
  Object.keys(headers).forEach(name=>{
    if(name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()){
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

// 响应头的转换 字符串转换成对象
export function parseHeaders(headers?:string):any{
  let parse = Object.create(null)
  if(!headers){
    return parse
  }
  const headersArr = headers.split("\r\n");
  headersArr.forEach(item=>{
    let [key,val] = item.split(":");
    if (!key) {
      return
    }
    key = key.trim().toLowerCase();
    if(val){
      val = val.trim()
    }
    
    parse[key] = val
    
  })
  return parse
}