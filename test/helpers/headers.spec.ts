import { parseHeaders,processHeaders,flattenHeaders} from '../../src/helpers/headers'

describe('helpers:headers',()=>{
  describe('parseHeaders',()=>{
    test('should parse headers',()=>{
      const parsed = parseHeaders(
        'Content-Type: application/json\r\n' +
        'Connection: keep-alive\r\n' +
        'Transfer-Encoding: chunked\r\n' +
        'Date: Tue, 21 May 2019 09:23:44 GMT\r\n' +
        ':aa\r\n' +
        'key:'
      )
      expect(parsed['content-type']).toBe('application/json')
      expect(parsed['date']).toBe('Tue, 21 May 2019 09:23:44 GMT')
    })
    test('should return empty object if headers is empty string',()=>{
      expect(parseHeaders('')).toEqual({})
    })
    
  })
  describe('processHeaders',()=>{
    test('should normalize Content-Type header name',()=>{
      const headers: any = {
        'conTent-type':'foo/bar',
        'content-length':1024
      }
      processHeaders(headers,{});
      expect(headers['Content-Type']).toBe('foo/bar');
      expect(headers['content-length']).toBe(1024);
      expect(headers['conTent-type']).toBeUndefined()
    })
    test('should set Content-Type if not set an data is PlainObject',()=>{
      const headers:any = {};
      processHeaders(headers,{});
      expect(headers['Content-Type']).toBe('application/json;charset=utf-8')
    })
    test('should set not Content-Type if not set and data is not PlainObject',()=>{
      const headers: any = {};
      processHeaders(headers,new URLSearchParams('a=b'));
      expect(headers['Content-Type']).toBeUndefined() 
    })
    test('should do nothing if headers is undefined or null',()=>{
      expect(processHeaders(null,{})).toBeNull()
      expect(processHeaders(undefined,{})).toBeUndefined()
    })
  })
  describe('flatterHeaders',()=>{
    test('should flatten the headers and include common headers',()=>{
      const headers = {
        Accept:'application/json',
        common:{
          'X-COMMON-HEADER':'commonHeaderValue'
        },
        get:{
          'X-GET-HEADER':'getHeaderValue'
        },
        post:{
          'X-POST-HEADER':'postHeaderValue'
        }
      }
      expect(flattenHeaders(headers,'get')).toEqual({
        Accept: 'application/json',
        'X-GET-HEADER': 'getHeaderValue',
        'X-COMMON-HEADER': 'commonHeaderValue'
      })
    })
    test('should flatten the headers without common headers',()=>{
      const headers:any = {
        Accept: 'application/json',
        get:{
          'X-GET-HEADER': 'getHeaderValue'
        }
      };
      expect(flattenHeaders(headers,'patch')).toEqual({
        Accept: 'application/json'
      })
    })
    test('should do nothing if headers is undefined or null',()=>{
      expect(flattenHeaders(undefined,'get')).toBeUndefined()
      // console.log(flattenHeaders(null, 'post'))
      expect(flattenHeaders(null, 'post')).toBeUndefined()
    })
  })
})