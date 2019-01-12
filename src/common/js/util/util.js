export function formatParam(data) {
  let value = ''
  for (let k in data) {
     if (k === 'tab') {
       value += `?${k}=${encodeURIComponent(data[k] !== undefined ? data[k] : '')}`
     } else {
       value += `&${k}=${encodeURIComponent(data[k] !== undefined ? data[k] : '')}`
     }
  }
  return value
}