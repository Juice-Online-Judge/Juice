import {
  prefixKeys,
  silencePromise,
  renameKey
} from '../utils'

describe('utils', () => {
  describe('#prefixKeys', () => {
    it('will return object that keys have prefix', () => {
      const obj = { foo: 'foo', bar: 'bar' }
      const prefixedObj = prefixKeys(obj, 'baz')
      expect(prefixedObj).toEqual({
        bazfoo: 'foo',
        bazbar: 'bar'
      })
    })
  })

  describe('#silencePromise', () => {
    it('will make promise silence', () => {
      const promise = Promise.reject('foo')

      return silencePromise(promise)
    })

    it('can accept any and return promise ', () => {
      return silencePromise('bar')
    })
  })

  describe('#renameKey', () => {
    it('will rename obj key', () => {
      const obj = { foo: 'foo', bar: 'bar' }
      const renamedObj = renameKey(obj, 'foo', 'baz')

      expect(renamedObj).toEqual({
        baz: 'foo',
        bar: 'bar'
      })
    })
  })
})
