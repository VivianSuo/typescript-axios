import { AxiosRequestConfig } from './types'

// 发送http请求的方法
export default function xhr(config:AxiosRequestConfig){
  const { data = null , url, method = 'get' } = config;
  const request = new XMLHttpRequest();
  request.open(method.toUpperCase(),url,true)
  request.send(data)
}