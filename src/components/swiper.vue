<template>

    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class=" swiper-slide" v-for="list in lists" :key="list.index">
          <a class="js-no-follow" :href="list.clickUrl">
            <img class="goods-main-photo fadeIn" :src="list.img">
          </a>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>

</template>

<script>
  import Swiper from 'Swiper'

  export default {
        name: "swiper",
        props:{
          lists:{
            // type:Array,
            required:true


          }
        },
    mounted() {
      let mySwiper = new Swiper ('.swiper-container', {loop: true,
          autoplay:true,
        pagination: {
          el: '.swiper-pagination',
            clickable:true
        },

      })
    }
  }
</script>

<style scoped>
 @import "../../node_modules/swiper/css/swiper.css";
</style>
