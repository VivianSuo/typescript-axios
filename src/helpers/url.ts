import { isDate, isPlainObject } from "./util";

// http请求的url传输过程中默认是会转换成字符串的，这个工作是由axios做的。ajax也会做。在转换的过程中他会根据不同的params格式,按照相应的方式进行转换。后台接收到的querystring才能是正常的。
// 根据参数的不同，最后拼接成的url的格式是不同的，但是对于服务端来说，他们的解析url的方法是一定的，他们的要求的目标格式是一定的，所以axios的终极目标也是将各种传输格式的params参数转换成服务端需要的querystring格式。
function encode (val:string):string{
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURl (url:string,params:any,paramsSerializer?:(params:any)=>string):string{
  if(!params){
    return url
  }
  let serializedParams;
  // debugger;
  if (paramsSerializer){
    // debugger
    serializedParams = paramsSerializer(params)
  }else if(isURLSearchParams(params)){
    serializedParams = params.toString()
  }else{
    // 用于存放key=value
    let parts: string[] = []
    Object.keys(params).forEach(key => {
      let val = params[key];
      if (val === null || typeof val === 'undefined') {
        return
      }
      let values: string[] = []
      if (Array.isArray(val)) {
        key += '[]';
        values = val
      } else {
        values = [val]
      }
      values.forEach(val => {
        // 由于isDate方法利用来typescript的自定义类型保护，在if分支中将val认定为是Date类型，才可以用Date类型对象的toISOString方法。否则会报错。下面的isPlainObject同理
        if (isDate(val)) {
          val = val.toISOString()
        } else if (isPlainObject(val)) {
          val = JSON.stringify(val)
        }
        parts.push(`${encode(key)}=${encode(val)}`)
      })
    })
    serializedParams = parts.join("&");
  }
  
  if(serializedParams){
    let hashIndex = url.indexOf('#');
    if(hashIndex > -1){
      url = url.slice(0,hashIndex)
    }
    url += (url.indexOf('?') > -1 ? '&' : '?') + serializedParams
  }
  return url
}

function isURLSearchParams(params:any) :params is URLSearchParams{
  return typeof params !== 'undefined' && params instanceof URLSearchParams
}

export function isAbsoluteURL(url:string):boolean{
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export function combineURL(baseURL:string,relativeURL?:string):string {
  return relativeURL? baseURL.replace('/\/+$/','') + relativeURL.replace('/^\/+/','') : baseURL
}