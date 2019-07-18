import { AxiosRequestConfig,AxiosResponse } from '../types'

export class AxiosError extends Error{
  public isAxiosError:boolean
  constructor(message:string,public config:AxiosRequestConfig,public code?:string|null ,public request?:any,public response?:AxiosResponse) {
    super(message);
    this.isAxiosError = true;
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}
export function createError(message:string,config:AxiosRequestConfig,code?:string|null,request?:any,response?:AxiosResponse):AxiosError{
  const error = new AxiosError(message,config,code,request,response);
  return error;
}
