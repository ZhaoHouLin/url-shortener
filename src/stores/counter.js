import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const urlData = ref('')

  const storeFetchData = (data) => {
    urlData.value = data
  }

  return {
    urlData,
    storeFetchData
  }

})
