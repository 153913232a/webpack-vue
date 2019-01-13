import axios from 'axios'
const STATUS_OK = 200
const BASE_URL = 'https://cnodejs.org/api/v1'
import qs from 'qs'
import {formatParam} from "@/common/js/util/util";

export function get(url) {
  return function (urlParams, params) { // urlParams用来把传递动态路由参数
    return axios.get(BASE_URL + url + urlParams + formatParam(params)).then(res => {
      const {status, data} = res
      if (status === STATUS_OK && data.success) {
        return data.data
      }
    })
  }
}
export function get_II(url) {
  return function (urlParams, data) {
    return axios.get(BASE_URL + url + urlParams,
        { params: data}).then(res => {
      const {status, data} = res
      if (status === STATUS_OK && data.success) {
        return data.data
      }
    })

  }
}

export function post(url) {
  return function (data, urlParam) {
    return axios.post(BASE_URL + url+(urlParam === undefined ? '': urlParam),
        qs.stringify(data),
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    ).then(res => {
      const {status, data} = res
      if (status === STATUS_OK && data.success
          && (url==='/accesstoken'
              || /^\/reply\/\w+\/ups/.test(url + urlParam)
              || /^\/topic\/\w+\/replies$/.test(url + urlParam)
              || /^\/message\/mark_one\/\w+/.test(url + urlParam))) {
        return data
      }
      else if (status === STATUS_OK && data.success) {
        return data.data
      }
    })
  }
}