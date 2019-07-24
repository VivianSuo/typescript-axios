import { AxiosRequestConfig,AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { transformResponse } from '../helpers/data'
import { AxiosError } from '../helpers/error';
import transform from './transform'
import { isURLSameOrigin, isFormData } from '../helpers/util'
import cookie from '../helpers/cookies'
import btoa from 'btoa'
// 发送http请求的方法
// 定义了AxiosPromise接口继承了Promise<AxiosResponse>泛型，那么函数返回的值是promise且其构造函数的参数是AxiosResponse类型
export default function xhr(config: AxiosRequestConfig): AxiosPromise{
  return new Promise((resolve,reject)=>{
    // debugger


    const { data = null, url, method = 'get', headers = {}, responseType, timeout, cancelToken, withCredentials, xsrfCookieName, xsrfHeaderName, onDownloadProgress, onUploadProgress, auth, validateStatus} = config;

    const request = new XMLHttpRequest();
    request.open(method.toUpperCase(), url!, true);
    configRequest();
    addEvents();
    processHeaders();
    processCancel();
    request.send(data);
    // 配置请求配置信息
    function configRequest():void{
      // 为请求添加响应类型
      if (responseType) {
        request.responseType = responseType;
      }

      if (timeout) {
        request.timeout = timeout;
      }

      if (withCredentials) {
        request.withCredentials = true;
      }
    }
    // 添加事件监听
    function addEvents():void{
      
      request.onreadystatechange = function () {
        // 监听请求响应事件，readyState！==4时说明请求失败
        if (request.readyState !== 4) {
          return
        }
        // 监听网络超时或者网络错误的时候跳出该函数
        if (request.status === 0) {
          return
        }
        // 响应成功时
        // 获取响应头
        const responseHeaders = parseHeaders(request.getAllResponseHeaders())
        const responseData = responseType && responseType !== 'text' ? request.response : request.responseText;
        // debugger
        const response: AxiosResponse = {
          data: transform(responseData, config.headers, config.transformResponse),
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        }
        handleResponse(response)
      }
      // 网络不通时触发
      request.onerror = function handleError() {
        reject(new AxiosError('network error', config, null, request))
      }
      // 网络超时时触发
      request.ontimeout = function handleTimeout() {
        reject(new AxiosError(`Timeout of ${timeout}ms exceeded`, config, 'ECONNABORTED', request))
      }
      // 声明下载进程事件
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }
      // 声明上传进程事件
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }
    // 设置请求头信息
    function processHeaders():void{
      // 将token值从cookie中拿取放入header对应字段中
      if (withCredentials || isURLSameOrigin(url!)) {
        // debugger
        const xsrfValue = cookie.read(xsrfCookieName!)
        if (xsrfValue) {
          headers[xsrfHeaderName!] = xsrfValue
        }
      }
      // 上传数据时修改content-type
      if (isFormData(data)) {
        delete headers['Content-Type']
      }
      // 请求头添加Authorization字段 http权限问题
      if(auth){
        headers['Authorization'] = 'Basic ' + btoa(auth.username+':'+auth.password)
      }

      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          // xhr真正添加请求头的是这里
          // debugger;
          request.setRequestHeader(name, headers[name])
        }
      })
    }
    function processCancel():void{
      if (cancelToken) {
        // debugger;
        // tslint:disable-next-line: no-floating-promises
        cancelToken.promise.then(reason => {
          // 如果配置中定义了cancelToken的化，cancelToken是一个拥有promise函数和reason属性的类
          console.log('then')
          // 中断当前请求
          request.abort();
          // 传递中断原因
          reject(reason);
        })
      }
    }
    // 网络http状态码判定
    function handleResponse(response: AxiosResponse) {
      if (!validateStatus || validateStatus(response.status)){
        resolve(response)
      }else {
        reject(new AxiosError(`Request failed with status code ${response.status}`, config, null, request, response))
      }
    }
  })
}