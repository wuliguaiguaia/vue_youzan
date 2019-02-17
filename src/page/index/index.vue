<template>
  <div class="container">
    <div class="content">
      <div>
        <swiper :lists="bannerLists" v-if="bannerLists"></swiper>
      </div>
      <div class="section-title">优店推荐</div>
      <div class="section-content shops">
        <div class="shop-wrap">
          <div class="shop-item">
            <a href>
              <img
                class="fadeIn"
                src="https://img.yzcdn.cn/upload_files/2016/09/23/FgQUVNXnvpFKFl1DIN2LXhPA1cxy.png?imageView2/2/w/300/h/0/q/75/format/png"
              >
            </a>
          </div>
          <div class="shop-item">
            <a href>
              <img
                class="fadeIn"
                src="https://img.yzcdn.cn/upload_files/2016/08/03/FqNGnCQS1eq9nIhRg48E_UfFf9K2.png?imageView2/2/w/300/h/0/q/75/format/png"
              >
            </a>
          </div>
          <div class="shop-item">
            <a href>
              <img
                class="fadeIn"
                src="https://img.yzcdn.cn/upload_files/2016/08/05/Fv5hhMZrtPZQWE7fape0ddEYtSuy.png?imageView2/2/w/300/h/0/q/75/format/png"
              >
            </a>
          </div>
        </div>
      </div>
      <div class="line-block line-block-gray">
        <div class="lineblock-title">
          <span class="lineblock-font">最热商品推荐</span>
        </div>
      </div>
      <div class="hot-goods js-waterfull-wrap" data-src>
        <ul
          class="js-list js-lazy"
          v-infinite-scroll="getHotLists"
          :infinite-scroll-disabled="loading"
          infinite-scroll-distance="50"
          data-src
        >
          <li v-for="item in hotLists" :key="item.id">
            <div class="goods-item">
              <a href>
                <div class="thumb img-box">
                  <img class="fadeIn" :src="item.img">
                </div>
                <div class="detail">
                  <div class="title">{{item.name}}</div>
                  <div class="price">￥{{item.price}}</div>
                </div>
              </a>
            </div>
          </li>
        </ul>
        <div class="loading-more" v-show="loading">
          <span></span>
        </div>
      </div>
    </div>
    <foot></foot>
  </div>
</template>
<script>
import foot from "@/components/foot";

import axios from "axios";
import URL from "js/api.js";
import Vue from "vue";
import { InfiniteScroll } from "mint-ui";
Vue.use(InfiniteScroll);

import swiper from "components/swiper";

export default {
  data() {
    return {
      hotLists: [],
      allLoaded: false,
      loading: false,
      pageNum: 1,
      pageSize: 6,
      bannerLists: null
    };
  },
  components: {
    swiper,
    foot
  },
  created() {
    this.getBannerLists();
  },
  methods: {
    getHotLists() {
      if (this.allLoaded) return;
      this.loading = true;
      axios
        .post(URL.hotLists, {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          let curLists = res.data.lists;
          if (curLists.length < this.pageSize) {
            this.allLoaded = true;
          }
          if (this.hotLists.length) {
            this.hotLists = this.hotLists.concat(curLists);
          } else {
            this.hotLists = curLists;
          }
          this.loading = false;
          this.pageNum++;
        });
    },
    getBannerLists() {
      axios.get(URL.banner).then(res => {
        this.bannerLists = res.data.lists;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.goods-item {
  background: #fff;
  .thumb {
    margin-bottom: 6px;
    text-align: center;
    background-color: #f4f4f4;
    position: relative;
    &:after {
      content: " ";
      display: block;
      padding-top: 100%;
    }
    img {
      position: absolute;
      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      max-width: 100%;
      max-height: 100%;
    }
  }
  .detail {
    .title {
      padding-bottom: 8px;
      font-size: 12px;
      line-height: 1;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .price {
      padding-bottom: 8px;
      font-size: 14px;
      color: #ff525e;
    }
  }
}

.img-box {
  position: relative;

  &:after {
    content: " ";
    display: block;
    padding-top: 100%;
  }

  img {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

.line-block {
  &:before {
    content: "";
    display: block;
    margin: 10px;
  }

  .lineblock-title {
    display: block;
    text-align: center;
    margin-top: -17px;
    margin-bottom: 17px;
    line-height: 14px;
  }

  .lineblock-font {
    display: inline-block;
    padding: 0 10px;
    background-color: #fff;
    color: #22c415;
  }

  &.line-block-gray:before {
    border-top: 1px solid #eee;
  }

  &.line-block-gray .lineblock-font {
    color: #999;
    background-color: #f8f8f8;
  }
}

.loading-more {
  width: 100%;
  padding: 20px 10px;
  vertical-align: middle;
  text-align: center;
  color: #999;
  font-size: 12px;
  line-height: 20px;
  box-sizing: border-box;

  span {
    display: inline-block;
    margin-top: 10px;
    width: 16px;
    height: 16px;
    background: url(https://b.yzcdn.cn/v2/image/loader.gif) no-repeat 50%;
    background-size: 16px 16px;
  }
}

.section-title {
  position: relative;
  display: block;
  padding: 15px 0 5px 10px;
  text-align: left;
  color: #999;
  font-size: 14px;
}

.section-content {
  position: relative;
  overflow: hidden;
  zoom: 1;

  &:after {
    content: "";
    display: table;
    clear: both;
  }
}

.shops {
  background-color: #fff;
  margin-bottom: 10px;
  font-size: 0;
  position: relative;

  &:after {
    content: " ";
    display: block;
    padding-top: 58%;
  }
  &:before {
    z-index: 1;
    content: "";
    box-sizing: border-box;
    width: 200%;
    height: 200%;
    transform: scale(0.5);
    transform-origin: left top;
    pointer-events: none;
    border-top: 1px solid #e5e5e5;
  }
}

.shop-wrap,
.shops:before {
  position: absolute;
  top: 0;
  left: 0;
}

.shop-wrap {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.shop-item {
  position: relative;
  display: inline-block;
  width: 33.333%;

  &:before {
    z-index: 1;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 200%;
    height: 200%;
    transform: scale(0.5);
    transform-origin: left top;
    pointer-events: none;
    border-right: 1px solid #e5e5e5;
  }

  &:last-child:before {
    content: "";
    display: none;
  }

  img {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    max-width: 100%;
    max-height: 100%;
  }
}

.hot-goods {
  overflow: hidden;

  ul {
    position: relative;
    padding: 0 6px;
    zoom: 1;
  }

  ul:after {
    content: "";
    display: table;
    clear: both;
  }

  li {
    float: left;
    width: 50%;
    box-sizing: border-box;
    padding-bottom: 6px;

    &:nth-child(odd) {
      padding-right: 3px;
    }

    &:nth-child(2n) {
      padding-left: 3px;
    }

    .goods-item {
      .thumb {
        margin-bottom: 10px;
        background-color: #fff;
      }

      .detail {
        padding: 0 8px 1px;
      }

      .title {
        color: #666;
        padding-bottom: 0;
        line-height: 16px;
        height: 32px;
        margin-bottom: 10px;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}

.line-block .lineblock-title .lineblock-font {
  background-color: #f4f4f4;
}

.line-block.line-block-gray {
  position: relative;
  margin: 20px 10px 10px;
}

.line-block.line-block-gray:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 200%;
  height: 200%;
  transform: scale(0.5);
  transform-origin: left top;
  pointer-events: none;
  border-top: 1px solid #ababab;
  height: 1px;
  margin: 7px 0 0;
}

.line-block .lineblock-title {
  position: relative;
}

.fadeIn {
  animation-duration: 1s;
  animation-name: a;
}

@keyframes a {
  0% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
