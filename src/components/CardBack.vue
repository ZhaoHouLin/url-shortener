<script setup>
import { useCounterStore } from "../stores/counter"
import CopyLinkIcon from "../components/icons/IconCopyLink.vue"
import ArrowBackIcon from "../components/icons/IconArrowBack.vue"

const counter = useCounterStore()

const clipboard = () => {
  navigator.clipboard.writeText(`http://192.168.68.71:7777/${counter.urlData}`)
}
</script>

<template lang="pug">
.back
  .shorten-url
    .result
      a(:href="`http://192.168.68.71:7777/${counter.urlData}`" alt='test') {{ `http://192.168.68.71:7777/${counter.urlData}` }}
      button(@click='clipboard') Copy Link
        CopyLinkIcon
      button.backBtn 返回
        ArrowBackIcon 
</template>

<style lang="stylus" scoped>
.back
  transform rotateY(180deg)
  .shorten-url
    border-radius 12px
    size(280px,auto)
    text-align center
    .title
      flex()
      svg
        size(1.2rem)
        margin-right 8px
    .result
      flex(,,column)
      opacity 0
      a
        text-decoration none
        color color_primary
        font-weight bold
        margin-bottom 1rem
      svg
        size(1.2rem)
        margin-right 8px
      button
        font-size 0.8rem
        size(120px,auto)
        flex(,,row-reverse)
        background none
        color color_primary
        border 1px solid rgba(color_primary,0.3)
        margin-top 0.8rem
        padding 4px
        cursor pointer
        svg
          size(1.2rem)
          color color_primary
</style>
