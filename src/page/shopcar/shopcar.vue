<template>
  <div class="container">
    <div class="container" style="min-height: 581px;">
      <div class="content clearfix js-page-content">
        <div id="cart-container">
          <div>
            <div class="js-shop-list shop-list">
              <div
                class="block block-order block-cart"
                v-for="(shop,shopIndex) in cartList"
                :key="shop.shopId"
              >
                <div class="header">
                  <div class="select-group js-select-group">
                    <span
                      class="check"
                      :class="{checked: editingShop ? shop.removeChecked : shop.checked }"
                      v-show="editingShop ? editingShop.shopId == shop.shopId : true"
                      @click="selectShop(shop)"
                    ></span>
                    <!-- v-show编辑状态其他的店铺不可操作 -->
                  </div>
                  <a class="shop-title">
                    <i class="custom-store-img">店铺：</i>
                    {{shop.shopTitle}}
                  </a>
                  <a
                    @click="selectShopEdit(shop,shopIndex)"
                    v-show="editingShop ? editingShop.shopId == shop.shopId : true"
                    class="j-edit-list pull-right c-blue font-size-12 edit-list"
                  >
                    <!---->
                    {{!editingShop ? '编辑' : '完成'}}
                  </a>
                </div>
                <!---->
                <div>
                  <ul class="js-list block block-list block-list-cart border-0">
                    <li
                      class="block-item block-item-cart"
                      :class="{editing: editingShop ? editingShopIndex === shopIndex : false}"
                      v-for="(good,goodIndex) in shop.goodsList"
                      :key="good.id"
                      @touchstart="touchStart($event,good)"
                      @touchend="touchEnd($event,shop,shopIndex,good,goodIndex)"
                      :ref="'goods-'+shopIndex+'-'+goodIndex"
                    >
                      <div>
                        <div class="check-container">
                          <span
                            class="check"
                            :class="{checked: editingShop ? good.removeChecked : good.checked}"
                            v-show="editingShop ? editingShop.shopId == shop.shopId : true"
                            @click="selectGood(shop,good,$event)"
                          ></span>
                        </div>
                        <div class="name-card clearfix">
                          <a class="thumb js-goods-link">
                            <img class="js-lazy" :src="good.img">
                          </a>
                          <div class="detail">
                            <a class="js-goods-link">
                              <h3 class="title js-ellipsis">
                                <i>{{good.title}}</i>
                              </h3>
                            </a>
                            <p class="sku ellipsis">
                              <span v-for="(item,index) in good.sku" :key="index">{{item}}</span>
                            </p>
                            <!-- 显示状态 -->
                            <div class="num static">
                              ×
                              <span class="num-txt">{{good.number}}</span>
                              <!---->
                            </div>
                            <!-- 编辑状态 -->
                            <div class="num edit">
                              <!---->
                              <div class="quantity">
                                <button
                                  type="button"
                                  class="minus"
                                  :class="{disabled:good.number === 1}"
                                  @click="updateNumber(good,'-1')"
                                ></button>
                                <input
                                  type="text"
                                  pattern="[0-9]*"
                                  class="txt"
                                  v-model.lazy.number="good.number"
                                  @change="updateNumber(good,good.number)"
                                >
                                <button type="button" class="plus" @click="updateNumber(good,'1')"></button>
                              </div>
                            </div>
                            <div class="price c-orange">
                              ¥
                              <span>{{good.price | formatePrice}}</span>
                            </div>
                          </div>
                          <div class="error-box"></div>
                        </div>
                        <div
                          class="delete-btn"
                          @click="deleteGood(shop,shopIndex,good,goodIndex,good.id)"
                        >
                          <span>删除</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="js-invalid-goods shop-list">
              <p class="block invalid-list-title">以下商品无法一起购买</p>
              <div class="block block-list-cart block-order border-top-0">
                <ul class="block border-0 invalid-list js-invalid-list">
                  <li class="block-item block-item-cart error">
                    <div index="0">
                      <div class="check-container hide">
                        <span class="check"></span>
                      </div>
                      <div class="name-card clearfix">
                        <a
                          href="https://h5.youzan.com/v2/showcase/goods?alias=36co1k2m80lmu"
                          class="thumb js-goods-link"
                        >
                          <img
                            data-src="https://img.yzcdn.cn/upload_files/2017/06/29/FstNOp77JZHQjZIDFd5LlZYE3j_j.jpg!200x200.jpg"
                            class="js-lazy"
                            src="https://img.yzcdn.cn/upload_files/2017/06/29/FstNOp77JZHQjZIDFd5LlZYE3j_j.jpg?imageView2/2/w/200/h/200/q/75/format/webp"
                          >
                          <!---->
                        </a>
                        <div class="detail">
                          <a
                            href="https://h5.youzan.com/v2/showcase/goods?alias=36co1k2m80lmu"
                            class="js-goods-link"
                          >
                            <h3 class="title js-ellipsis">
                              <i>国际安徒生奖大奖书系（文学作品系列第二辑 共8册） 国际安徒生奖获奖书系 是经过IBBY各国分会和丛书主编、著名儿童文学理论家方卫平教授层层筛选产生的经典佳作</i>
                            </h3>
                          </a>
                          <p class="sku ellipsis">下周二发货</p>
                          <div class="num">
                            ×
                            <span class="num-txt">1</span>
                            <!---->
                          </div>
                          <!---->
                        </div>
                        <div class="error-box">商品已售罄</div>
                      </div>
                      <div class="delete-btn">
                        <span>删除</span>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="center clear-block">
                  <button class="btn clear-btn js-clear">清空失效商品</button>
                </div>
              </div>
            </div>
            <div style="padding:0;" class="js-bottom-opts bottom-fix">
              <div class="go-shop-tip js-go-shop-tip c-orange font-size-12">你需要分开结算每个店铺的商品哦~</div>
              <div
                class="bottom-cart clear-fix"
                :class="{isEdit:editingShop,isCheck:totalPrice > 0}"
              >
                <!-- isEdit -->
                <div class="select-all">
                  <span
                    class="check"
                    :class="{checked:editingShop ? allRemoveChecked:allChecked}"
                    @click="selectAll()"
                  ></span> 全选
                </div>
                <!-- 显示状态 -->
                <div class="total-price">
                  合计：¥
                  <span class="js-total-price">{{totalPrice | formatePrice}}</span>
                  <p class="c-gray-dark">不含运费</p>
                </div>
                <button
                  href="javascript:;"
                  class="js-go-pay btn font-size-14"
                  @click="goTopay"
                >结算 ({{selectList&&selectList.length}})</button>
                <!-- 编辑状态 -->
                <button
                  href="javascript:;"
                  class="j-delete-goods btn font-size-14"
                  :class="{' btn-red':removeList&&removeList.length > 0}"
                  @click="deleteGood"
                >删除</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer" style="min-height: 86px;">
      <div class="copyright">
        <div
          class="ft-copyright"
          style="background-image: url(https://img.yzcdn.cn/upload_files/2016/11/15/147918630760182374.png);"
        >
          <a class="yz-logo" href="https://www.youzan.com/?from_source=support_logo">有赞提供技术支持</a>
        </div>
      </div>
    </div>
    <!-- popup -->
    <div class="van-dialog" v-show="isShowPopup">
      <!---->
      <div class="van-hairline van-dialog__content">
        <div
          class="van-dialog__message"
        >{{ removeList ? `确定要删除${removeList.length > 0 ? '这':"该"}${removeList.length > 0 ?removeList.length : ""}件商品么` :"确定要删除该商品么" }}?</div>
      </div>
      <div class="van-dialog__footer van-dialog__footer--buttons">
        <button
          class="van-button van-button--default van-button--large van-dialog__cancel"
          @click="cancelRemove"
        >
          <!---->
          <span class="van-button__text">取消</span>
        </button>
        <button
          class="van-button van-button--default van-button--large van-dialog__confirm van-hairline--left"
          @click="confirmRemove"
        >
          <!---->
          <span class="van-button__text">确认</span>
        </button>
      </div>
    </div>
    <!-- mask -->
    <div class="van-modal" v-show="isShowPopup"></div>
  </div>
</template>
<script>
// import URL from "js/api.js";
// import axios from "axios";
// import _fetch from "js/fetch.js";
import Vue from "vue";
import mixin from "js/mixin";
import "velocity-animate/velocity.ui.min.js";
import _cart from "js/cartService.js";

export default {
  data() {
    return {
      cartList: null,
      editingShop: null,
      isShowPopup: false,
      removeData: {},
    };
  },
  watch: {},
  mixins: [mixin],
  computed: {
    editingShopIndex() {
      if (this.editingShop) {
        return this.cartList.findIndex(shop => {
          return shop.shopId == this.editingShop.shopId;
        });
      }
    },
    selectList() {
      if (this.cartList && this.cartList.length) {
        let arr = [];
        this.cartList.forEach(shop => {
          shop.goodsList.forEach(good => {
            if (good.checked) {
              arr.push(good);
            }
          });
        });
        return arr;
      }
    },
    removeList: {
      get() {
         if (this.editingShop) {
          let arr = [];
          this.editingShop.goodsList.forEach(good => {
             if(good.removeChecked){
                arr.push(good);
             } 
          })
          return arr;
       } 
      },
      set(val)  {}
    },
    canPay() {
      return (this.totalPrice>0 && !this.editingShop) ? true:false;
    },
    totalPrice() {
      let price = 0;
      if (this.cartList && this.cartList.length) {
        this.cartList.forEach(shop => {
          shop.goodsList.forEach(good => {
            if (good.checked) {
              price += good.price * good.number;
            }
          });
        });
      }
      return price;
    },
    allRemoveChecked: {
      get() {
        if (this.cartList && this.cartList.length) {
          return this.editingShop.removeChecked;
        }
      },
      set(val) {
        this.editingShop.removeChecked = val;
        this.editingShop.goodsList.forEach(good => {
          good.removeChecked = val;
        });
      }
    },
    allChecked: {
      // long time
      get() {
        if (this.cartList && this.cartList.length) {
          return this.cartList.every(shop => {
            return shop.checked;
          });
        }
      },
      set(val) {
        if (this.cartList && this.cartList.length) {
          this.cartList.forEach(shop => {
            shop.checked = val;
            shop.goodsList.forEach(good => {
              good.checked = val;
            });
          });
        }
      }
    }
  },
  components: {},
  created() {
     _cart.getAllList().then(lists=>{
       lists.forEach(shop => {
         shop.checked = false;
         shop.removeChecked = false;
         shop.goodsList.forEach(good => {
           good.checked = false;
           good.removeChecked = false;
         });
       });
       this.cartList = lists;
     });
  },
  // 有加就有减，有true就有false
  watch: {
  },
  methods: {
    goTopay() {
      if (this.canPay && this.totalPrice > 0) {
        this.$router.push({ name: "pay" });
      }
    },
    selectShopEdit(shop) {
      this.editingShop = this.editingShop ? null : shop;
      if(this.editingShop){
        // 所有滑动的收回来
        this.recoverSlide()
      }
    },
    recoverSlide(){
      this.cartList.forEach((xshop,shopIndex)=>{
          xshop.goodsList.forEach((good,goodIndex) => {
            Velocity(this.$refs[`goods-${shopIndex}-${goodIndex}`], { left:0 });
          });
        })
    },
    deleteGood(shop, shopIndex, good, goodIndex, id) {
      if (arguments.length > 0) {
        // 单个
        this.removeData = { shop, shopIndex, good, goodIndex, id };
      }
      this.isShowPopup = true;
    },
    confirmRemove() {
      if (this.removeData.id) {
        // 单个
        let { shop, shopIndex, good, goodIndex, id } = this.removeData;
        _cart.remove(id).then(()=>{
          shop.goodsList.splice(goodIndex, 1);
          if (shop.goodsList.length === 0) {
            this.cartList.splice(shopIndex, 1);
          }
          this.recoverStatus();
        })
      } else {
        // 批量
        let ids = [];
        this.removeList.forEach(good => {
          ids.push(good.id);
        });

        _cart.removeMore(ids).then(()=>{
          if (ids.length === this.editingShop.goodsList.length) {
            // 全删
            this.cartList.splice(this.editingShopIndex, 1);
            console.log("all delete");
          } else {
            //
            this.cartList.forEach((shop, si) => {
              if (si === this.editingShopIndex) {
                // forEach不可以实现 i-- 有bug why
                for (let i = 0; i < shop.goodsList.length; i++) {
                  if (ids.indexOf(shop.goodsList[i].id) > -1) {
                    shop.goodsList.splice(i, 1);
                    i--;
                  }
                }
              }
            });
          this.recoverStatus();
          }
        })
      }
    },
    cancelRemove() {
      this.isShowPopup = false;
    },
    recoverStatus() {
      this.removeData = null;
      this.editingShop = null;
      this.isShowPopup = false;
    },
    updateNumber(good, n) {
      switch (n) {
        case "1":
          _cart.update(good.id,good.number + 1).then(()=>{
            good.number++;
          })
          break;
        case "-1":
          if (good.number === 1) {
            return;
          } else {
             _cart.update(good.id,good.number - 1).then(()=>{
                good.number--;
              })
          }
          break;
        default:
            _cart.update(good.id,n)
      }
    },
    touchStart(e, good) {
      good.startX = e.changedTouches[0].clientX;
      
    },
    touchEnd(e, shop, shopIndex, good, goodIndex) {
      if (this.editingShop) {
        return;
      }
      let endX = e.changedTouches[0].clientX;
      let left = "0";
      if (endX - good.startX > 80) {
        left = "0px";
      } else if(endX - good.startX < -80){
        left = "-60px";
      }
      Velocity(this.$refs[`goods-${shopIndex}-${goodIndex}`], { left });
      
    },
    selectShop(shop) {
      let attr = this.editingShop ? "removeChecked" : "checked";
      shop[attr] = !shop[attr];
      shop.goodsList.forEach(good => {
        good[attr] = shop[attr];
      });
    },
    selectGood(shop, good, e) {
      e.stopPropagation();
      let attr = this.editingShop ? "removeChecked" : "checked";
      good[attr] = !good[attr];
      shop[attr] = shop.goodsList.every(good => {
        return good[attr];
      });
    },
    selectAll() {
      let attr = this.editingShop ? "allRemoveChecked" : "allChecked";
      this[attr] = !this[attr];
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("./cart_base.scss");
@import url("./cart_trade.scss");
@import url("./cart.scss");
.content {
}

.block-item-cart {
  .name-card {
    .num.static {
      display: block;
    }
    .num.edit {
      display: none;
    }
  }
  &.editing {
    left: 0 !important;
    .name-card {
      .num.static {
        display: none;
      }
      .num.edit {
        display: block;
      }
    }
  }
}

.bottom-cart {
  color: rgb(153, 153, 153);
  .total-price {
    display: block;
  }

  .j-delete-goods {
    display: none;
  }

  .btn {
    border: none;
    background: rgb(241, 241, 241);
  }
  &.isCheck {
    .total-price {
      color: rgb(255, 130, 46);
    }
    .js-go-pay.btn {
      color: #fff;
      background-color: #ed5050;
      border-color: #ed5050;
    }
  }

  &.isEdit {
    .total-price {
      display: none;
    }
    .j-delete-goods {
      display: block;
    }
  }
}
.van-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 70%;
  font-size: 16px;
  border-radius: 4px;
  background-color: #fff;
  z-index: 2002;
  transform: translate(-50%, -50%);
}
.van-dialog__message {
  line-height: 1.5;
  padding: 15px 20px;
  border-bottom: 1px solid #ccc;
}

.van-dialog__footer--buttons {
  display: flex;
  justify-content: space-around;

  button {
    width: 100%;
    height: 50px;
    line-height: 48px;
    background-color: #fff;
    border-radius: 3px;
    text-align: center;
    box-sizing: border-box;
    color: #333;
    outline: none;
    border: none;

    &:active {
      background-color: #ccc;
    }
    &:last-child {
      color: #00c000;
      border-left: 1px solid #ccc;
    }
  }
}

.van-dialog__footer {
  overflow: hidden;
}

.van-modal {
  z-index: 2001;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
