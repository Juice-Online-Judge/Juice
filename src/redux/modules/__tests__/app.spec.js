jest.disableAutomock()
jest.mock('lib/api')

import { fromJS } from 'immutable'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { RequestStatus } from 'lib/const'
import reducer, * as app from '../app'
import { clearExam } from 'redux/modules/exam'
import { clearQuestion } from 'redux/modules/question'
import { clearSubmissions } from 'redux/modules/submission'
import { clearUsers } from 'redux/modules/users'
import api from 'lib/api'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('(Redux) app', () => {
  describe('(Action Creators) #setStatus', () => {
    it('Create action to set status', () => {
      expect(app.setStatus('foo')).toEqual({
        type: app.SET_STATUS,
        payload: 'foo'
      })
    })
  })

  describe('(Action Creators) #clearStatus', () => {
    it('Create action to clear status', () => {
      expect(app.clearStatus()).toEqual({
        type: app.CLEAR_STATUS,
        payload: undefined
      })
    })
  })

  describe('(Action Creators) #setError', () => {
    it('Create action to set error', () => {
      expect(app.setError('foo')).toEqual({
        type: app.SET_ERROR,
        payload: 'foo'
      })
    })
  })

  describe('(Action Creators) #clearError', () => {
    it('Create action to clear error', () => {
      expect(app.clearError()).toEqual({
        type: app.CLEAR_ERROR,
        payload: undefined
      })
    })
  })

  describe('(Async Actions) #clearCache', () => {
    it('Clear all cache', () => {
      const store = mockStore({})

      store.dispatch(app.clearCache())

      expect(store.getActions()).toEqual(jasmine.arrayContaining([
        clearExam(),
        clearQuestion(),
        clearUsers(),
        clearSubmissions()
      ]))
    })
  })

  describe('(Async Actions) #request', () => {
    describe('When request success', () => {
      it('Send request and set success status', () => {
        const store = mockStore({})
        api.addFakeResponse({
          url: 'foo'
        })

        return store.dispatch(app.request({ url: 'foo' }))
          .then((result) => {
            expect(result).toBe(true)
            expect(store.getActions()).toEqual(jasmine.arrayContaining([
              app.setStatus(RequestStatus.PENDING),
              app.setStatus(RequestStatus.SUCCESS)
            ]))
          })
      })
    })

    describe('When request fail', () => {
      it('Send request and set fail status', () => {
        const store = mockStore({})
        api.addFakeResponse({
          url: 'foo',
          error: {
            code: 418
          }
        })

        return store.dispatch(app.request({ url: 'foo' }))
          .then((result) => {
            expect(result).toBe(false)
            expect(store.getActions()).toEqual(jasmine.arrayContaining([
              app.setStatus(RequestStatus.PENDING),
              app.setStatus(RequestStatus.FAIL)
            ]))
          })
      })
    })

    afterEach(() => api.clearFakeResponse())
  })

  describe('(Selector) #isPendingSelector', () => {
    describe('When is pending', () => {
      it('Will return true', () => {
        const initialState = new app.App({ status: RequestStatus.PENDING })
        const state = { app: initialState }
        expect(app.isPendingSelector(state)).toBe(true)
      })
    })

    describe('When is not pending', () => {
      it('Will return false', () => {
        const initialState = new app.App({ status: RequestStatus.NONE })
        const state = { app: initialState }
        expect(app.isPendingSelector(state)).toBe(false)
      })
    })
  })

  describe('(Selector) #createIsErrorSelector', () => {
    describe('When is error', () => {
      it('Will return true', () => {
        const initialState = new app.App({ status: RequestStatus.FAIL })
        const state = { app: initialState }
        const isErrorSelector = app.createIsErrorSelector()
        expect(isErrorSelector(state)).toBe(true)
      })
    })

    describe('When is not error', () => {
      it('Will return false', () => {
        const initialState = new app.App({ status: RequestStatus.NONE })
        const state = { app: initialState }
        const isErrorSelector = app.createIsErrorSelector()
        expect(isErrorSelector(state)).toBe(false)
      })
    })
  })

  describe('(Selector) #createErrorSelector', () => {
    describe('When is error', () => {
      it('Will return error content', () => {
        const initialState = new app.App({
          status: RequestStatus.FAIL,
          error: fromJS({ messages: 'foo' })
        })
        const state = { app: initialState }
        const errorSelector = app.createErrorSelector()
        expect(errorSelector(state)).toEqual('foo')
      })
    })

    describe('When is not error', () => {
      it('Will return null', () => {
        const initialState = new app.App({
          status: RequestStatus.NONE,
          error: fromJS({ messages: 'foo' })
        })
        const state = { app: initialState }
        const errorSelector = app.createErrorSelector()
        expect(errorSelector(state)).toBeNull()
      })
    })
  })

  describe('(Reducer)', () => {
    it('Configure initial state correct', () => {
      expect(reducer(undefined, {})).toEqualImmutable(app.initialState)
    })

    it('Handle setState action', () => {
      const expectedState = app.App({
        status: 'foo'
      })

      expect(reducer(app.initialState, {
        type: app.SET_STATUS,
        payload: 'foo'
      })).toEqualImmutable(expectedState)
    })

    it('Handle clearState action', () => {
      const initialState = app.App({
        status: 'foo'
      })
      const expectedState = app.App({
        status: 'NONE'
      })
      const actualState = reducer(initialState, {
        type: app.CLEAR_STATUS
      })

      expect(actualState).toEqualImmutable(expectedState)
    })
  })
})
