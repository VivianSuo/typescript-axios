// 自定义类型
export type Method = "get" | "GET" | "post" | "POST" | "delete" | "DELETE" | "put" | "PUT" | "head" | "HEAD" | "options" | "OPTIONS" | "patch" | "PATCH"
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

export interface AxiosResponse{
  data:any;
  status:number;
  statusText:string;
  headers:any;
  config:AxiosRequestConfig;
  request:any;
}

export interface AxiosPromise extends Promise<AxiosResponse>{}