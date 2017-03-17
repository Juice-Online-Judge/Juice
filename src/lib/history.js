import createHistory from 'history/createBrowserHistory'
import qs from 'qs'

const history = createHistory()

history.listen(() => {
  history.location = {
    ...history.location,
    query: qs.parse(history.location.search.slice(1))
  }
})

export default history
