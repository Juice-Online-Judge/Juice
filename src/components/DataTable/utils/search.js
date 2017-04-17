const regexMatchFactory = filter => {
  const regex = new RegExp(filter, 'i')
  return item => String(item).match(regex)
}

const search = ({ key, filter, data, matchFactory = regexMatchFactory }) => {
  if (filter.length < 1) return data

  const match = matchFactory(filter)
  const keys = typeof key === 'string' ? [key] : key

  return data.filter(item => keys.some(key => match(item[key])))
}

export default search
