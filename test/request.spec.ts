import axios,{AxiosResponse , AxiosError} from '../src/index';
import { getAjaxRequest } from './helper'
// import { AxiosError, AxiosError } from '../src/helpers/error';

describe('requset',()=>{
  beforeEach(()=>{
    jasmine.Ajax.install()
  })
  afterEach(()=>{
    jasmine.Ajax.uninstall()
  })
  test('should treat single string arg as url',()=>{
    axios('/foo');
    return getAjaxRequest().then(request=>{
      // console.log(request)
      expect(request.url).toBe('/foo')
      expect(request.method).toBe('GET')
    })
  })
  test('should treat method value as lowercase string',done=>{
    axios({
      url:'/foo',
      method:'POST'
    }).then(response=>{
      expect(response.config.method).toBe('post')
      done()
    }).catch(e=>{
      // console.log(e)
    })
    return getAjaxRequest().then(req=>{
      req.respondWith({
        status:200
      })
    })
  })
  test('should reject on network errors',done=>{
    const resolveSpy = jest.fn((res:AxiosResponse)=>{
      return res
    })
    const rejectSpy = jest.fn((e:AxiosError)=>{
      return e;
    })
    jasmine.Ajax.uninstall();
    
    // tslint:disable-next-line: no-floating-promises
    axios('/foo').then(resolveSpy).catch(rejectSpy).then(next)
    function next(reason:AxiosResponse|AxiosError){
      expect(resolveSpy).not.toHaveBeenCalled()
      expect(rejectSpy).toHaveBeenCalled()
      expect(reason instanceof Error).toBeTruthy()
      expect((reason as AxiosError).message).toBe('network error')
      expect(reason.request).toEqual(expect.any(XMLHttpRequest))
      jasmine.Ajax.install()
      done()
    }
  })

  test('should reject when request timeout',done=>{
    let err:AxiosError;
    axios('/fpp',{
      timeout:2000,
      method:'post'
    }).catch((e:AxiosError)=>{
      err = e
    })
    return getAjaxRequest().then(req=>{
      // @ts-ignore
      req.eventBus.trigger('timeout')
      setTimeout(()=>{
        expect(err instanceof Error).toBeTruthy()
        expect(err.message).toBe('Timeout of 2000ms exceeded')
        done()
      },100)
    })
  })
  test('should reject on validateStatus return false', done=>{
    const resolveSpy = jest.fn((res: AxiosResponse) => {
      return res
    })
    const rejectSpy = jest.fn((e: AxiosError) => {
      return e;
    })
    // tslint:disable-next-line: no-floating-promises
    axios('/foo',{
      validateStatus(status){
        return status !== 500
      }
    }).then(resolveSpy).catch(rejectSpy).then(next);
    return getAjaxRequest().then(req=>{
      req.respondWith({
        status:500
      })
    })
    function next(reason:AxiosError|AxiosResponse){
      expect(resolveSpy).not.toHaveBeenCalled()
      expect(rejectSpy).toHaveBeenCalled()
      expect(reason instanceof Error).toBeTruthy()
      expect((reason as AxiosError).message).toBe('Request failed with status code 500')
      expect((reason as AxiosError).response!.status).toBe(500)
      done()
    }
  })
  test('should return JSON when resolved', done => {
    let response: AxiosResponse

    // tslint:disable-next-line: no-floating-promises
    axios('/api/account/signup', {
      // auth: {
      //   username: '',
      //   password: ''
      // },
      method: 'post',
      headers: {
        Accept: 'application/json'
      }
    }).then(res => {
      response = res
      expect(response.data).toEqual({ a: 1 })
    })

    return getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        statusText: 'OK',
        responseText: '{"a": 1}'
      })
      done() 
    })
  })

})