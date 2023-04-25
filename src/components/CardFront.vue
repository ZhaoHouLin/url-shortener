<script setup>
import { ref } from "vue"
import { useFetch } from "../api"
import LinkIcon from "../components/icons/IconLink.vue"

const urlVal = ref("")

const handleUrl = () => {
  useFetch(urlVal.value, "http://localhost:7777/")
}
</script>

<template lang="pug">
.front 
  .origin-url
    input(type="text" v-model="urlVal" placeholder="請輸入要縮短的網址")
  button.btn(@click='handleUrl') 產生
    LinkIcon
    h4(ref='link') 短網址  
</template>

<style lang="stylus" scoped>
.front
  z-index 2
  .origin-url
    flex(,,column)
    input
      size(240px,auto)
      padding 8px 0
      font-size 1rem
      text-align center
      color color_primary
      border 1px solid rgba(color_primary,0.2)
      border-radius 1rem
      outline none
      caret-color color_secondary
      &:focus
        border 1px solid rgba(color_primary,0.5)
      &::placeholder /* CSS 3 標準 */
        color rgba(color_primary,0.6)
      &::-webkit-input-placeholder /* Chrome, Safari */
        color rgba(color_primary,0.6)
      &::-ms-input-placeholder /* IE 10+ */
        color rgba(color_primary,0.6)
      &::-moz-placeholder /* Firefox 19+ */
        color rgba(color_primary,0.6)

  .btn
    size(120px,auto)
    margin 2rem 0
    padding 0.5rem
    font-size 1rem
    background none
    color color_primary
    border 1px solid rgba(color_primary,0.3)
    border-radius 8px
    cursor pointer
    flex(,,column)
    svg
      size(2rem)
      color color_primary
      margin 4px
</style>
