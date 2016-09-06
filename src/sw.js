import {
  cacheFirst,
  networkFirst,
  networkAndCache
} from './sw/strategy'
import router from './sw/routes.js'

const location = new URL(self.registration.scope)

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/app.js',
        '/vendor.js',
        '/vendor/fallback/fallback.min.js',
        '/vendor/es5-shim/es5-shim.js',
        '/vendor/es5-sham/es5-sham.js'
      ])
    })
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  if (url.pathname.endsWith('.js') && url.host === location.host) {
    event.respondWith(
      networkAndCache(request)
    )
  } else if (url.pathname.includes('.')) {
    event.respondWith(
      networkFirst(request)
    )
  } else if (url.pathname.startsWith('/api')) {
    event.respondWith(
      apiHandler(request)
    )
  } else {
    event.respondWith(
      cacheFirst('/')
    )
  }
})

function apiHandler(request) {
  return router.dispatch(request)
    .then((result) => typeof result === 'string'
      ? new Response(JSON.stringify(result), {
        status: 200,
        statusText: 'OK',
        headers: {
          'Content-Type': 'applcation/json; charset=utf8'
        }
      })
      : result
    )
}
