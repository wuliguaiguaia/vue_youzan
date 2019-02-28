<template>
  <div class="container">
    <div>
      <search-form></search-form>
      <div class="content">
        <div class="class-nav">
          <div id="scroll-nav" >
            <ul
              class="nav"
              id="scroll-nav-content"
              >
              <li
                v-for="item in topLists"
                :key="item.id"
                class="category-name js-category-name"
                :class="{'active' : checkId === item.id}"
                data-cid="item.id"
                @click="toggleNav(item.id)"
              >{{item.name}}</li>
            </ul>
          </div>
        </div>
        <div class="class-category">
          <div id="scroll-main-wrap" class="main-content">
            <div
              id="scroll-main-content"
              v-if="checkId === -1&&rankData"
              class="js-main-content inner-content"
            >
              <div class="hot-wrap">
                <div class="hot-goods">
                  <div class="hot-title">
                    <p class="pull-left">热销商品榜</p>
                    <a href class="pull-right icon-right">更多</a>
                  </div>
                  <ul>
                    <li v-for="(good,index) in rankData.hotGoods" :key="good.id" class="goods-item">
                      <!-- <hotItem :good="good" :index="index"  ></hotItem> -->
                      <a @click="$router.push({path: '/goodDetail/:id',params:{id:good.id}})">
                        <div class="thumb badge center-img">
                          <img :src="good.img">
                          <span class="num">{{index+1}}</span>
                        </div>
                        <div class="detail">
                          <div class="title">{{good.name}}</div>
                          <div class="price">￥{{good.price | formatePrice}}</div>
                          <div class="recommend">
                            <span>推荐值:</span>
                            <span>{{good.recommend}}</span>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="hot-shops">
                  <div class="hot-title">
                    <p class="pull-left">TOP店铺榜</p>
                    <a href class="pull-right icon-right">更多</a>
                  </div>
                  <ul>
                    <li v-for="(shop,index) in rankData.hotShops" :key="shop.id" class="shop-item">
                      <div class="shop-title">
                        <span class="badge">{{index+1}}</span>
                        <a>{{shop.name}}</a>
                        <span class="follows">/ 关注度: {{shop.likeDegree}}</span>
                      </div>
                      <ul class="shop-images">
                        <li v-for="(item,xindex) in shop.imgs" :key="xindex">
                          <a :href="item.img">
                            <img :src="item">
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div class="hot-keywords">
                  <div class="hot-title">
                    <p class="pull-left">热搜词排行</p>
                  </div>
                  <ul class="keywords-list">
                    <li v-for="(word,index) in rankData.hotKeywords" :key="index">
                      <a href="javascript:;" class="js-hot-keyword">{{word}}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              id="scroll-main-content"
              v-if="checkId !== 0&&subData"
              class="js-main-content inner-content"
            >
              <h3 class="category-title">热门品牌</h3>
              <ul class="category-content">
                <li
                  v-for="brand in subData.hotBrands"
                  :key="brand.id"
                  class="category-item js-category-item"
                  :data-item-name="brand.name"
                >
                  <img :src="brand.img" :alt="brand.name" class="category-img">
                  <span class="category-item-name">{{brand.name}}</span>
                </li>
              </ul>
              <h3 class="category-title">热门分类</h3>
              <ul class="category-content">
                <li
                  v-for="sort in subData.hotSorts"
                  :key="sort.id"
                  class="category-item js-category-item"
                  :data-item-id="sort.id"
                  :data-item-name="sort.name"
                >
                  <img :src="sort.img" :alt="sort.name" class="category-img">
                  <span class="category-item-name">{{sort.name}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading></loading>
    <foot></foot>
  </div>
</template>
<script>
import loading from "@/components/loading";
import searchForm from "@/components/searchForm";
import foot from "@/components/foot";
import axios from "axios";
import URL from "js/api.js";
import mixin from "js/mixin.js";
// import hotItem from "@/components/hot-item";
export default {
  data() {
    return {
      topLists: null,
      rankData: null,
      subData: null,
      checkId: -1,
      keyword: ""
    };
  },
  components: { foot, searchForm ,loading},
  created() {
    this.getTopLists();
    this.getRankData();
  },
  methods: {
    getTopLists() {
      axios.get(URL.topLists).then(res => {
        this.topLists = res.data.lists;
      });
    },
    getRankData() {
      axios.get(URL.rank).then(res => {
        this.rankData = res.data.data;
      });
    },
    getSubData(id) {
      axios.post(URL.subLists, { id }).then(res => {
        this.subData = res.data.data;
      });
    },
    toggleNav(id) {
      this.checkId = id;
      if (id > 0) {
        this.getSubData(id);
      }
    }
  },
  mixins: [mixin]
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #f4f4f4;
}
.content{
  margin-top:45px;
  margin-bottom: 60px;
}

.center-img {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  width: 60px;
  height: 60px;
  img {
    max-width: 100%;
    max-height: 100%;
    border: 0;
    vertical-align: middle;
  }
}

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

  .detail .title {
    padding-bottom: 8px;
    font-size: 12px;
    line-height: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .detail .price {
    padding-bottom: 8px;
    font-size: 14px;
    color: #ff525e;
  }
}

.list-finished,
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

.list-finished span,
.loading-more span {
  display: inline-block;
  margin-top: 10px;
  width: 16px;
  height: 16px;
  background: url("/v2/image/loader.gif") no-repeat 50%;
  background-size: 16px 16px;
}

@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
  only screen and (min--moz-device-pixel-ratio: 1.5),
  only screen and (min-device-pixel-ratio: 1.5) {
  .list-finished span,
  .loading-more span {
    background-image: url("/v2/image/loader@2x.gif");
  }
}

.container {
  overflow-y: hidden;
  position: relative;
}

.content {
  overflow-y: auto;
  box-sizing: border-box;
  width: 100%;
}

.tabs-content {
  padding-top: 50px;
  background-color: #f4f4f4;
}

.shops-panel .list-finished,
.tabber {
  background-color: #fff;
}

.tabber {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  color: #333;
  font-size: 14px;
  overflow: visible;
  border-image: url(https://b.yzcdn.cn/v2/image/wap/border-line-2.png) 2 stretch;
  border-bottom: 1px solid #e5e5e5;
  z-index: 998;
}

.tabber a {
  float: left;
  width: 50%;
  border: 0 none;
  outline: 0 none;
  background-color: #fff;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.tabber li {
  display: inline-block;
  line-height: 38px;
  padding: 0 8px;
}

.tabber a.active li {
  color: #f44;
  border-bottom: 1px solid #f44;
}

.container {
  background-color: #fff;
  box-sizing: border-box;
}

.class-nav {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #f4f4f4;
}

.class-category,
.class-nav {
  height: 100%;
  overflow: hidden;
}

.class-category {
  margin-left: 96px;
  box-sizing: border-box;
}

.inner-content {
  width: 100%;
}

.inner-content,
.nav {
  transition-timing-function: ease;
}

.nav {
  box-sizing: border-box;
  float: left;
  width: 82px;
  font-size: 13px;
  background-color: #f4f4f4;
  text-align: left;
  margin-top:45px;
}

.nav .category-name {
  position: relative;
  padding: 20px 10px;
  background: #f4f4f4;
  border-bottom: 1px solid #fff;
  border-image: url("https://b.yzcdn.cn/v2/image/wap/border-line.png") 2 stretch;
  border-bottom: 2px solid #e5e5e5;
}

@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
  only screen and (min--moz-device-pixel-ratio: 1.5),
  only screen and (min-device-pixel-ratio: 1.5) {
  .nav .category-name {
    border-bottom-width: 1px;
  }
}

.nav .category-name.active {
  background: #fff;
  color: #fa6060;
}

.main-content {
  height: 100%;
}

.main-content .category-title {
  color: #b3b3b3;
  margin-top: 3px;
  margin-bottom: 5px;
  margin-left: 4%;
  font-size: 12px;
  position: relative;
}

.main-content .category-title:first-child {
  margin-top: 4px;
}

.main-content .category-content {
  width: 100%;
  position: relative;
  text-align: center;
  overflow: hidden;
}

.main-content .category-item {
  width: 33.3%;
  box-sizing: border-box;
  text-align: center;
  float: left;
  padding-bottom: 12px;
  margin-bottom: 10px;
}

.main-content .category-img {
  width: 60px;
  height: 60px;
  display: inline-block;
  text-align: center;
}

.main-content .category-item-name {
  display: block;
  margin-top: 0;
  font-size: 12px;
}

.main-content .category-loading {
  margin-left: -21px;
  margin-top: 120px;
  left: 50%;
  border-width: 3px;
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  border-style: solid;
  border-color: #d9d9d9 #d9d9d9 #d9d9d9 transparent;
  box-shadow: 0 0 0 1px transparent;
  animation: loader 0.8s linear;
  animation-iteration-count: infinite;
}

.main-content .category-tip {
  margin-top: 120px;
  font-size: 12px;
  color: #ccc;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
  width: 80%;
  text-align: center;
}

.hot-goods {
  position: relative;
}

.hot-goods .goods-item {
  display: block;
  position: relative;
  width: auto;
  margin-bottom: 12px;
}

.hot-goods .goods-item .thumb {
  float: left;
  position: relative;
  width: 90px;
  height: 90px;
  margin: 0;
}

.hot-goods .goods-item .badge:before {
  position: absolute;
  top: 0;
  left: 0;
  content: " ";
  border-style: solid;
  border-width: 12px;
  border-color: #fc5959 transparent transparent #fc5959;
  z-index: 1;
}

.hot-goods .goods-item .badge .num {
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
  font-size: 12px;
  line-height: 1.5;
  margin-left: 3px;
  z-index: 2;
}

.hot-goods .goods-item .detail {
  margin-left: 100px;
  height: 90px;
  font-size: 12px;
  padding: 3px 20px 0 0;
  box-sizing: border-box;
  border-image: url("https://b.yzcdn.cn/v2/image/wap/border-line.png") 2 stretch;
  border-bottom: 2px solid #e5e5e5;
}
.hot-goods .goods-item .title {
  line-height: 1.5;
  margin-bottom: 14px;
  padding-bottom: 0;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.hot-goods .goods-item .price {
  display: inline-block;
  margin-right: 20px;
  float: left;
}

.hot-goods .goods-item .recommend {
  color: silver;
  display: inline-block;
      float: left;
    margin-top: 2px;
}

.hot-title {
  font-size: 14px;
  line-height: 1.5;
  padding: 8px 8px 8px 0;
  zoom: 1;
}

.hot-title:after {
  content: "";
  display: table;
  clear: both;
}

.hot-title .icon-right {
  color: #fc5959;
  font-size: 12px;
  padding-left: 50px;
}

.hot-title .icon-right:after {
  display: inline-block;
  content: " ";
  width: 6px;
  height: 20px;
  background: url("https://b.yzcdn.cn/v2/image/yzapp/h5/more-red@3x.png")
    no-repeat 50%;
  background-size: 100% auto;
  margin: 0 8px 2px 4px;
  vertical-align: middle;
}

.hot-goods,
.hot-keywords,
.hot-shops {
  position: relative;
}
.hot-keywords{
  margin-bottom:59px；
}

.shop-item {
  margin-bottom: 22px;
}

.shop-title {
    font-size: 12px;
    position: relative;
    text-align: left;
}

.shop-title .badge {
  display: inline-block;
  background-color: #fc5959;
  text-align: center;
  color: #fff;
  border-radius: 3px;
  padding: 2px 4px;
  margin-right: 3px;
  font-size: 10px;
  line-height: 10px;
  vertical-align: middle;
  margin-bottom: 4px;
}

.shop-title .follows {
  color: silver;
  margin-left: 4px;
}

.shop-images {
  margin-right: 10px;
  font-size: 0;
}

.shop-images li {
  position: relative;
  width: 32%;
  box-sizing: border-box;
  margin-right: 2%;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
}

.shop-images li:after {
  content: " ";
  display: block;
  padding-top: 100%;
}

.shop-images li:last-child {
  margin-right: 0;
}

.shop-images li img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 100%;
  max-height: 100%;
  margin: auto;
}

.keywords-list {
  padding-bottom: 20px;
}

.keywords-list li {
  display: inline-block;
  position: relative;
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 12px;
}

.keywords-list li:before {
  border-radius: 5px;
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
  border: 1px solid #ccc;
}

.keywords-list li a {
  display: block;
  padding: 6px 15px;
}
 
 
@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1turn);
  }
}
</style>
