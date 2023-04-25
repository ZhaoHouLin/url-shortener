<script setup>
import { onMounted } from "vue"
import { RouterLink, RouterView } from "vue-router"
import { gsap } from "gsap"

import CardFront from "./components/CardFront.vue"
import CardBack from "./components/CardBack.vue"

onMounted(() => {
  gsap.defaults({ ease: "linear" })

  const btn = document.querySelector(".btn")
  const backBtn = document.querySelector(".backBtn")

  const tlLinkRotate = gsap.timeline({ paused: true }).to(".btn svg", {
    rotate: -360,
    repeat: -1,
  })

  const tlCardRotate = gsap
    .timeline({ paused: true })
    .to(".card", {
      rotateY: 180,
      boxShadow: "-4px 4px 12px rgba(34,34,34,0.3)",
    })
    .to(".result", { opacity: 1 })

  btn.addEventListener("mouseenter", () => tlLinkRotate.play())
  btn.addEventListener("mouseleave", () => tlLinkRotate.reverse())

  btn.addEventListener("click", () => tlCardRotate.play())
  backBtn.addEventListener("click", () => tlCardRotate.reverse())
})
</script>

<template lang="pug">
.card
  CardFront
  CardBack

.author
  h6 created by 
    a(href="mailto:rodes5292@gmail.com") 
      span ZZ

</template>

<style lang="stylus" scoped>
.card
  pos()
  transform translate(-50%,-50%)
  flex(,,column)
  size(320px)
  background-color #fff
  box-shadow 4px 4px 12px rgba(color_secondary,0.3)
  border-radius 1rem
  transform-style preserve-3d
  // perspective 800px
  .front,.back
    position absolute
    size()
    flex(,,column)
    backface-visibility hidden
    // overflow hidden

.author
  position absolute
  bottom 0
  right 0
  margin 1rem
  color color_primary
  a
    color color_primary
    text-decoration none
    font-weight 900
</style>
