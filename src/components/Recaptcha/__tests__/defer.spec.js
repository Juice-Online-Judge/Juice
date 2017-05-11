import defer from '../defer'

describe('defer', () => {
  it('Return defer object', () => {
    const deferred = defer()
    expect(deferred).toMatchSnapshot()
  })

  describe('#resolve', () => {
    it('Resolve with given value', async () => {
      const deferred = defer()
      const value = 42

      deferred.resolve(value)
      expect(await deferred.promise).toBe(value)
    })
  })
})
