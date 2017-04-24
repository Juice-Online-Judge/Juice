const CACHE_NAME = 'v1'

export function preCache (list) {
  return caches.open(CACHE_NAME).then(cache => {
    return cache.addAll(list)
  })
}

export function cacheFirst (request) {
  return caches.match(request).then(response => {
    const fetchPromise = fetchAndCache(request)
    return response || fetchPromise
  })
}

export function networkAndCache (request) {
  return fetch(request)
    .then(response => {
      return caches
        .open(CACHE_NAME)
        .then(cache => {
          return cache.put(request, response.clone())
        })
        .then(() => {
          return response
        })
    })
    .catch(() => {
      return caches.match(request)
    })
}

export function networkFirst (request) {
  return fetch(request)
    .then(response => {
      return updateCache(request, response)
    })
    .catch(() => {
      return caches.match(request)
    })
}

export function networkOnly (request) {
  return fetch(request)
}

export function fetchAndCache (request) {
  return fetch(request)
    .then(response => {
      return updateCache(request, response)
    })
    .catch(() => null)
}

export function updateCache (request, response) {
  const url = new URL(request.url)

  if (url.hostname !== 'localhost' && url.protocol !== 'https') {
    return response
  }

  return Promise.resolve(caches.open(CACHE_NAME))
    .then(cache => {
      return [cache, cache.match(request)]
    })
    .spread((cache, result) => {
      if (result) {
        cache.put(request, response.clone())
      }
      return response
    })
}
