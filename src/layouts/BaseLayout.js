import { Children } from 'react'
import setDisplayName from 'recompose/setDisplayName'

const BaseLayout = setDisplayName('BaseLayout')(({ children }) => Children.only(children))

export default BaseLayout
