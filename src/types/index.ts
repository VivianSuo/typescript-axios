// 自定义类型
export type Method = "get" | "GET" | "post" | "POST" | "delete" | "DELETE" | "put" | "PUT" | "head" | "HEAD" | "options" | "OPTIONS" | "patch" | "PATCH"

// axios请求配置接口
export interface AxiosRequestConfig {
  url: string;
  method?: Method;
  data?: any;
  params?: any;
  headers?: any;
  responseType?:XMLHttpRequestResponseType;
  timeout?:number;
  [propName:string]:any;
  transformRequest?: AxiosTransformer | AxiosTransformer[];
  transformResponse?: AxiosTransformer | AxiosTransformer[];
}

export interface AxiosTransformer{
  (data:any,headers?:any):any
}

// axios响应接口
export interface AxiosResponse<T = any>{
  data:T;
  status:number;
  statusText:string;
  headers:any;
  config:AxiosRequestConfig;
  request:any;
}

// axios返回的promise接口
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>>{}

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
  interceptors: Interceptors
  request<T = any>(config:AxiosRequestConfig):AxiosPromise<T>;
  get<T = any>(url:string,config?:AxiosRequestConfig):AxiosPromise<T>;
  delete<T = any>(url:string,config?:AxiosRequestConfig):AxiosPromise<T>;
  head<T = any>(url:string,config?:AxiosRequestConfig):AxiosPromise<T>;
  options<T = any>(url:string,config?:AxiosRequestConfig):AxiosPromise<T>;
  post<T = any>(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise<T>;
  put<T = any>(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise<T>;
  patch<T = any>(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise<T>;
}

// AxiosInstance定义的是一个函数接口 ,支持重载
export interface AxiosInstance extends Axios{
  defaults: any;
  <T = any>(config:AxiosRequestConfig):AxiosPromise<T>
  <T = any>(url:string,config?:AxiosRequestConfig):AxiosPromise<T>
}

export interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export interface Interceptors {
  request: AxiosInterceptorManager<AxiosRequestConfig>
  response: AxiosInterceptorManager<AxiosResponse>
}
// 拦截器管理对象
export interface AxiosInterceptorManager<T>{
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn):number
  forEach(fn:(interceptor:Interceptor<T>)=>void):void
  eject(id:number):void
}
// 对于请求和响应拦截的参数是不同的（请求拦截参数为config,响应拦截参数为response）所以需要用到泛型
export interface ResolvedFn<T=any>{
  (val:T):T | Promise<T>
}
export interface RejectedFn{
  (error:any):any
}

export interface AxiosStatic extends AxiosInstance{
  create(config?:any):AxiosInstance
}