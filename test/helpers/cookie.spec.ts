import cookie from '../../src/helpers/cookies'

describe('helpers:cookie',()=>{
  test('should read cookies',()=>{
    document.cookie = 'bar=foo';
    expect(cookie.read('bar')).toBe('foo')
  })
  test('should return null if cookie name is not exists',()=>{
    document.cookie = 'foo=bar';
    expect(cookie.read('aa')).toBeNull()
  })
})


