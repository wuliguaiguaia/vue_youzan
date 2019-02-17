<template>
  <div class="container">
    <div class="content">
      <div>
        <swiper :lists="bannerLists" v-if="bannerLists"></swiper>
      </div>
      <a href="#" class="notice"></a>
      <div class="section-title">优店推荐</div>
      <div class="section-content shops">
        <div class="shop-wrap">
          <div class="shop-item">
            <a href="#">
              <img
                class="fadeIn"
                src="https://img.yzcdn.cn/upload_files/2016/09/23/FgQUVNXnvpFKFl1DIN2LXhPA1cxy.png?imageView2/2/w/300/h/0/q/75/format/png"
              >
            </a>
          </div>
          <div class="shop-item">
            <a href="#">
              <img
                class="fadeIn"
                src="https://img.yzcdn.cn/upload_files/2016/08/03/FqNGnCQS1eq9nIhRg48E_UfFf9K2.png?imageView2/2/w/300/h/0/q/75/format/png"
              >
            </a>
          </div>
          <div class="shop-item">
            <a href="#">
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
              <a href="#">
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
      <div class="js-show-find category-guid" style="display: none;"></div>
    </div>
    <foot></foot>
  </div>
</template>
<script>
import foot from "components/foot";
import swiper from "components/swiper";

import axios from "axios";
import URL from "js/api.js";
import Vue from "vue";
import { InfiniteScroll } from "mint-ui";
Vue.use(InfiniteScroll);

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
    .sell-out {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: url(/v2/image/yzapp/h5/2listicon_shouqing@2x.png) no-repeat
        50%;
      background-size: 40% auto;
      background-color: rgba(0, 0, 0, 0.3);
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

.line-block:before {
  content: "";
  display: block;
  margin: 10px;
}

.line-block .lineblock-title {
  display: block;
  text-align: center;
  margin-top: -17px;
  margin-bottom: 17px;
  line-height: 14px;
}

.line-block .lineblock-font {
  display: inline-block;
  padding: 0 10px;
  background-color: #fff;
  color: #22c415;
}

.line-block.line-block-gray:before {
  border-top: 1px solid #eee;
}

.line-block.line-block-gray .lineblock-font {
  color: #999;
  background-color: #f8f8f8;
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
}

.loading-more span {
  display: inline-block;
  margin-top: 10px;
  width: 16px;
  height: 16px;
  background: url(https://b.yzcdn.cn/v2/image/loader.gif) no-repeat 50%;
  background-size: 16px 16px;
}
 

.section-title {
  position: relative;
  display: block;
  padding: 15px 0 5px 10px;
  text-align: left;
  color: #999;
  font-size: 14px;
 .more {
  position: absolute;
  display: block;
  width: 50px;
  right: 0;
  top: 20px;
  padding-right: 15px;
  text-align: right;
  i {
  display: inline-block;
  width: 14px;
  height: 14px;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAA8xJREFUSA2llltIVFEUhp3jZZzpJlFkROBL1EOBEUE9RTeURgrpJfDFh0ERr2P3HmKyC3SB8YIwivMiPYR0Rcsgix4ysKCCMOhKRNr0UEbKyDhe+tZwthxP55xGO7BZe+/1r/WvtfbeZ29XWgrfzMyMq7GxcZvL5dpLfy0mq2luxlHGw8h+j8fTV15eHvuXO5cToKOjY/no6OhJMKW0IRz3Ij9omhZFxqenp3MlAOZ3IiWgB+np6cHq6urX6C0/W0IyOo6TIzi5RrtcW1v7xdKDPhmJRJaMjY2VEoQE+IhWFQgEfplt/iJsbW1dPDExcRVgDq0Uo89mI6dxZ2fnopGRkQaCPUAl9tfU1Lwx4ucQSpSU8AkZ9WdnZ9eyJgkjeD795ubmErINQVoE6TNlO0tIRLIxulF8IqsaBfgfCakP0nBmZubWyspKWfc0TTlEeZq+Jz8/v17N/a8ks7tUqzWRSNxUvpIZsm65rNug1+vdSBm/KaVZlpWVncLBLqpxrL29/YVZbzemck+xa2bjXUtmODk5Kdl1OJEFg0ENI9m5u8E+rKio2GJHYJ7H5hStoaurK12jlG4GJdT5khloHEM4De6iPpczNTXVlyope+Ixdj+i0ehuDUMp0cuqqqofRgKrPmW8wPxZXTcvUmxus4F8UtICtu493ck/BaRS/nmT8gcSjgIhzKO9paX8LYSUKr6DIE82gvwPk2ckZUaAFqSykdbb+eCIxNHFNMi8pBuzAzrNCyn2V3TMMtbojBMebExK+p3OKiegnY5zuYIKFSg9fqRslh86OfMrhfAbgzWWKIdJIUMtt8ImHdbrdrvP25mEw+GV6H6zQbUBCHfYAa3mbciKW1paZJ0sv3g8LhwDGnW/S2efnrIl2Di5EDKxx7+P5Ho0/b772tTU5DM6tuovlExeDqx1UVZWVresYRrMZ4jgXApZXgduXDPHMqqguWOPQ9jFsRlKEnJGupmIkWWZApml/vNW50w2SEpkrOsGfPkzMjIaxGeSUDpMlJJhQygU2i5j8yc/b87rLgI7hO6A0wZRtvjK4Sa6QwXr1QWcvA8VgAwLIY3guNDp5aXwTpJbaCkXwy3IXnEPHlbY2QxlAsV9MggQVR/kxQo0X4ntOnb/AHaDLNdRo/2cDJWC6DZLdJD3E+FpjD4qnZPUH2EBqlSN7Ym6urqIGW9JKKC2tjbv+Ph4HcYBjB9C3M0TpNfv9/80OuEWzxoeHpZDXQRW1lcey0G756UtoXIqCw/hQcY+HO6hP0k/+fJGyk2zHPmcgHqQN1iW90jb7w/2Ad4Ucnl03gAAAABJRU5ErkJggg==");
  background-size: 100% auto;
  background-repeat: no-repeat;
}
}
}
 
.section-content {
  position: relative;
  overflow: hidden;
  zoom: 1;
}

.section-content:after {
  content: "";
  display: table;
  clear: both;
}

.shops {
  background-color: #fff;
  margin-bottom: 10px;
  font-size: 0;
  position: relative;
}

.shops:after {
  content: " ";
  display: block;
  padding-top: 58%;
}

.shops:before {
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
}

.shop-item:before {
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

.shop-item:last-child:before {
  content: "";
  display: none;
}

.shop-item img {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  max-width: 100%;
  max-height: 100%;
}

.channels {
  margin-bottom: 12px;
  position: relative;
  overflow: hidden;
}

.channels:after {
  display: block;
  padding-top: 54%;
  content: " ";
}

.channels .primary-channel {
  left: 0;
  width: 55%;
  padding-right: 5px;
}

.channels .primary-channel,
.channels .secondary-channel {
  position: absolute;
  top: 0;
  height: 100%;
  box-sizing: border-box;
}

.channels .secondary-channel {
  right: 0;
  width: 45%;
}

.channels .secondary-channel a {
  height: 50%;
}

.channels .secondary-channel a:first-child {
  margin-bottom: 5px;
}

.channels .secondary-channel a:last-child {
  margin-top: 5px;
}

.channels a {
  display: block;
  position: relative;
  height: 100%;
}

.channels img {
  position: absolute;
  width: 100%;
  height: 100%;
}

.view-history {
  display: block;
  height: 40px;
  margin: 0 10px 20px;
  color: #fe6573;
  text-align: center;
  line-height: 40px;
  position: relative;
}

.view-history:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 200%;
  height: 200%;
  transform: scale(0.5);
  transform-origin: left top;
  border: 1px solid #fe6573;
}

.hot-goods {
  overflow: hidden;
  ul {
  position: relative;
  padding: 0 6px;
  zoom: 1;

    &::after{
      content: "";
      display: table;
      clear: both;

    }
  }
  li {
  float: left;
  width: 50%;
  box-sizing: border-box;
  padding-bottom: 6px;
  
}
li:nth-child(odd) {
  padding-right: 3px;
}
li:nth-child(2n) {
  padding-left: 3px;
}

}
 

.hot-goods li .goods-item .thumb {
  margin-bottom: 10px;
  background-color: #fff;
}

.hot-goods li .goods-item .detail {
  padding: 0 8px 1px;
}

.hot-goods li .goods-item .title {
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

.line-block {
  .lineblock-title {
    position: relative;
  }
}

.category-guid {
  font-size: 0;
  margin-bottom: 10px;
}

.notice {
  padding: 10px;
  display: block;
  font-size: 12px;
  line-height: 16px;
  color: #f90;
  background-color: #ffc;
  letter-spacing: 0.4px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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
