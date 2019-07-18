import { AxiosRequestConfig,AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'
import { transformResponse } from './helpers/data'
// 发送http请求的方法
// 定义了AxiosPromise接口继承了Promise<AxiosResponse>泛型，那么函数返回的值是promise且其构造函数的参数是AxiosResponse类型
export default function xhr(config: AxiosRequestConfig): AxiosPromise{
  return new Promise(resolve=>{
    const { data = null, url, method = 'get', headers = {}, responseType } = config;
    const request = new XMLHttpRequest();
    // 为请求添加响应类型
    if(responseType){
      request.responseType = responseType;
    }
    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function(){
      // 监听请求响应事件，readyState！==4时说明请求失败
      if(request.readyState !== 4){
        return 
      }
      // 响应成功时
      // 获取响应头
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText;
      const response: AxiosResponse = {
        data:transformResponse(responseData),
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        // xhr真正添加请求头的是这里
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })



}