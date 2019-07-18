// 自定义类型
export type Method = "get" | "GET" | "post" | "POST" | "delete" | "DELETE" | "put" | "PUT" | "head" | "HEAD" | "options" | "OPTIONS" | "patch" | "PATCH"

// axios请求配置接口
export interface AxiosRequestConfig {
  url: string;
  method?: Method;
  data?: any;
  params?: any;
  headers?: {
    [propName:string]:any
  };
  responseType?:XMLHttpRequestResponseType,
  timeout?:number
}

// axios响应接口
export interface AxiosResponse{
  data:any;
  status:number;
  statusText:string;
  headers:any;
  config:AxiosRequestConfig;
  request:any;
}

// axios返回的promise接口
export interface AxiosPromise extends Promise<AxiosResponse>{}

// axios异常接口
export interface AxiosError extends Error{
  config:AxiosRequestConfig;
  code?:number;
  request?:any;
  response?:AxiosResponse;
  isAxiosError:boolean
}

// 创建一个混合对象接口
export interface Axios {
  request(config:AxiosRequestConfig):AxiosPromise;
  get(url:string,config?:AxiosRequestConfig):AxiosPromise;
  delete(url:string,config?:AxiosRequestConfig):AxiosPromise;
  head(url:string,config?:AxiosRequestConfig):AxiosPromise;
  options(url:string,config?:AxiosRequestConfig):AxiosPromise;
  post(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise;
  put(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise;
  patch(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise;
}

// AxiosInstance定义的是一个函数接口
export interface AxiosInstance extends Axios{
  (config:AxiosRequestConfig):AxiosPromise
}