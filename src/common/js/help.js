import axios from 'axios'
const STATUS_OK = 200
import qs from 'qs'

// export function get(url) {
//   return function (urlParams, params) { // urlParams用来把传递动态路由参数
//     return axios.get(BASE_URL + url + urlParams + formatParam(params)).then(res => {
//       const {status, data} = res
//       if (status === STATUS_OK && data.success) {
//         return data.data
//       }
//     })
//   }
// }
export function get(url) {
  return function (urlParams, params) {
    return axios.get(url + (urlParams === undefined ? '' : urlParams),
        { params}).then(res => {
      const {status, data} = res
      if (status === STATUS_OK && data.success) {
        return data.data
      }
    })

  }
}

export function post(url) {
  return function (data, urlParam) {
    return axios.post(url+(urlParam === undefined ? '': urlParam),
        qs.stringify(data),
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    ).then(res => {
      const {status, data} = res
      if (status === STATUS_OK && data.success
          && (url==='/api/v1/accesstoken'
              || /^\/api\/v1\/reply\/\w+\/ups/.test(url + urlParam)
              || /^\/api\/v1\/topic\/\w+\/replies$/.test(url + urlParam)
              || /^\/api\/v1\/message\/mark_one\/\w+/.test(url + urlParam))) {
        return data
      }
      else if (status === STATUS_OK && data.success) {
        return data.data
      }
    })
  }
}