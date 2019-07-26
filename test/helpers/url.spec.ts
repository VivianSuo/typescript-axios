import { buildURl,isAbsoluteURL,combineURL,isURLSearchParams} from '../../src/helpers/url'

describe('helpers:url',()=>{
  describe('buildURl',()=>{
    test('should support null params',()=>{
      expect(buildURl('/foo')).toBe('/foo')
    })
    test('should support params',()=>{
      expect(buildURl('/bar',{foo:'foo'})).toBe('/bar?foo=foo')
    })
    test('should ignore if some param value is null',()=>{
      expect(buildURl('/foo',{foo:'foo',bar:null})).toBe('/foo?foo=foo')
    })
    test('should support object params',()=>{
      expect(buildURl('/foo',{bar:{a:1}})).toBe('/foo?bar='+encodeURI('{"a":1}'))
    })
    test('should support date params',()=>{
      const date = new Date()
      expect(buildURl('/foo', { data: date })).toBe('/foo?data=' + date.toISOString())
    })
    test('should support array params',()=>{
      expect(buildURl('/foo',{
        foo:['bar','baz']
      })).toBe('/foo?foo[]=bar&foo[]=baz')
    })
    test('should use serializer if provided',()=>{
      const serializer = jest.fn(()=>{
        return 'foo=bar'
      })
      const params = {foo:'foo'}
      expect(buildURl('/foo',params,serializer)).toBe('/foo?foo=bar')
      expect(serializer).toHaveBeenCalled()
      expect(serializer).toHaveBeenCalledWith(params)
    })
  })
  describe('isAbsoluteURL',()=>{
    test('should return true if URL begins with valid scheme name',()=>{
      expect(isAbsoluteURL('https://api.github.com/users')).toBeTruthy()
      expect(isAbsoluteURL('custom-scheme-v1.0://example.com/')).toBeTruthy()
      expect(isAbsoluteURL('HTTP://example.com/')).toBeTruthy()
    })
    test('should return false if URL begins with invalid scheme name', () => {
      expect(isAbsoluteURL('123://example.com/')).toBeFalsy()
      expect(isAbsoluteURL('!valid://example.com/')).toBeFalsy()
    })

    test('should return true if URL is protocol-relative', () => {
      expect(isAbsoluteURL('//example.com/')).toBeTruthy()
    })

    test('should return false if URL is relative', () => {
      expect(isAbsoluteURL('/foo')).toBeFalsy()
      expect(isAbsoluteURL('foo')).toBeFalsy()
    })
  })
  describe('combineURL', () => {
    test('should combine URL', () => {
      expect(combineURL('https://api.github.com', '/users')).toBe('https://api.github.com/users')
    })

    test('should remove duplicate slashes', () => {
      expect(combineURL('https://api.github.com/', '/users')).toBe('https://api.github.com/users')
    })

    test('should insert missing slash', () => {
      expect(combineURL('https://api.github.com', 'users')).toBe('https://api.github.com/users')
    })

    test('should not insert slash when relative url missing/empty', () => {
      expect(combineURL('https://api.github.com/users', '')).toBe('https://api.github.com/users')
    })

    test('should allow a single slash for relative url', () => {
      expect(combineURL('https://api.github.com/users', '/')).toBe('https://api.github.com/users/')
    })
  })
  
})