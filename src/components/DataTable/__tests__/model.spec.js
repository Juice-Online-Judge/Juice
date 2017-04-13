import Model from '../model'

const data = [
  {
    id: 0,
    username: 'foo',
    nickname: 'bar'
  },
  {
    id: 1,
    username: 'bar',
    nickname: 'foo'
  }
]

describe('Model', () => {
  describe('#constructor', () => {
    it('Build model', () => {
      const model = new Model()
      expect(model).toMatchSnapshot()
    })
  })

  describe('#setFilter', () => {
    it('Filter data', () => {
      const model = new Model({
        data,
        search: 'username'
      })

      expect(model.data).toEqual(data)
      model.setFilter('foo')
      expect(model.data).toEqual([
        {
          id: 0,
          username: 'foo',
          nickname: 'bar'
        }
      ])
      model.setFilter('')
      expect(model.data).toEqual(data)
    })
  })

  describe('#setChecked', () => {
    it('Mark checked on data', () => {
      const spy = jest.fn()
      const model = new Model({data})
      model.addListener('checked', spy)

      model.setChecked(0, true)
      expect(spy).toHaveBeenCalledWith(new Set([0]))
      model.setChecked(1, true)
      expect(spy).toHaveBeenCalledWith(new Set([0, 1]))
      model.setChecked(1, false)
      expect(spy).toHaveBeenCalledWith(new Set([0]))
    })
  })

  describe('Internal api', () => {
    const model = new Model()

    describe('#_emitChange', () => {
      it('Emit change event', () => {
        const spy = jest.fn()
        model.addListener('change', spy)

        expect(spy).not.toHaveBeenCalled()
        model._emitChange()
        expect(spy).toHaveBeenCalled()
      })
    })

    describe('#_setData', () => {
      it('Set internal data and emit change event', () => {
        const spy = jest.fn()
        const data = [1, 2, 3]
        model.addListener('change', spy)

        expect(spy).not.toHaveBeenCalled()
        model._setData(data)
        expect(spy).toHaveBeenCalled()
        expect(model.data).toBe(data)
      })
    })
  })
})
