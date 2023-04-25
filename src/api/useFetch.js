
import { reactive, ref } from "vue"
import axios from 'axios'
import { useCounterStore } from '../stores/counter'

export const Fetchs = (insertUrl = '', API_URL = '') => {
  const counter = useCounterStore()

  // const fetchData = reactive({ data: [] })

  const data = ref('')
  const isLoad = ref(false)
  const errorMsg = ref('')

  axios.post(API_URL, {
    "原網址": insertUrl,
  }).then((res, req) => {
    // console.log(res.data)
    counter.storeFetchData(res.data)
  }).catch(error => {
    console.dir(error)    //用dir才看得到
    // errorMsg.value = error.request.statusText
    counter.storeFetchData('錯誤')
  })


  return {
    isLoad,
    errorMsg,
  }
}