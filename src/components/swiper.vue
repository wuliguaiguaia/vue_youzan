<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <!-- Slides -->
      <div class="swiper-slide" v-for="(list,index) in lists" :key="index">
        <a :href="list.clickUrl">
          <img :src="list.img" alt>
        </a>
      </div>
    </div>
    <div class="swiper-pagination" v-show="load"></div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  props: {
    lists: {
      type: Array,
      require: true
    }
  },
  created() {},
  mounted() {
     this.init();
  },
  computed:{
    load(){
      if(this.lists.length>0){
        return true
      }else{
        return false;
      }
    }
  },
  methods:{
    init(){
      new Swiper(".swiper-container", {
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100vw;
  height:100%;
}
.swiper-slide img {
  width: 100%;
  height: 100%;
}
</style>

    
