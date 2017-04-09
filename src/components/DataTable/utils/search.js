const regexMatchFactory = (filter) => {
  const regex = new RegExp(filter, 'i')
  return (item) => String(item).match(regex)
}

const search = ({key, filter, data, matchFactory = regexMatchFactory}) => {
  if (filter.length < 1) return data

  const match = matchFactory(filter)
  const keys = typeof key === 'string' ? [key] : key

  return data.filter((item) => {
    for (let i = 0; i < keys.length; i += 1) {
      if (match(item[keys[i]])) {
        return true
      }
    }
    return false
  })
}

export default search
