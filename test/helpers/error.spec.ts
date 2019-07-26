import { createError } from '../../src/helpers/error';
import { AxiosRequestConfig,AxiosResponse} from '../../src/types'
import Axios from '../../src/core/Axios';

describe('helpers:error',()=>{
  test('build create an Error with message,config,code,request,response and isAxiosError',()=>{
    const request = new XMLHttpRequest();
    const config:AxiosRequestConfig = { method:'post'};
    const response:AxiosResponse = {
      status:200,
      statusText:'ok',
      headers:null,
      request,
      config,
      data:{foo:'bar'}
    }
    const error = createError('BOom',config,'somecode',request,response);
    expect(error instanceof Error).toBeTruthy();
    expect(error.message).toBe('BOom')
    expect(error.config).toBe(config)
    expect(error.code).toBe('somecode')
    expect(error.request).toBe(request)
    expect(error.response).toBe(response)
    expect(error.isAxiosError).toBeTruthy()
  })
})