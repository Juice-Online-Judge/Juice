import createHistory from 'history/createBrowserHistory'
import qhistory from 'qhistory'
import { stringify, parse } from 'qs'

const history = createHistory()

export default qhistory(history, stringify, parse)
