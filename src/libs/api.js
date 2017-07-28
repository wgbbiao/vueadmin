import axios from 'axios'
import qs from 'qs'
const instance = axios.create({
  // baseURL: 'http://192.168.50.127:8000/api/'
  baseURL: 'http://vueadmin/xadmin/'
})

function getCookie(name) {
  var cookieValue = null
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';')
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim()
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

export default {
  /**
   * 保存内容
   */
  index: (data) => {
    return instance.get(`/`)
  },
  login: (data) => {
    axios.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken')
    return instance.post('', qs.stringify(data))
  },
  list: (app, model, parms) => {
    return instance.get(`/${app}/${model}/`, parms)
  },
  detail: (app, model, pk, parms) => {
    return instance.get(`/${app}/${model}/${pk}/update/`, parms)
  },
  getCookie: (name) => {
    return getCookie(name)
  }
}
