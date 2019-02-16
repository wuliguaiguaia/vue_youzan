<template>
  <div>
    <ul class="block-list address-list section section-first js-no-webview-block" v-if="lists">
      <li
        class="block-item js-address-item address-item"
        v-for="(list,index) in lists"
        :key="list.id"
        @click="edit(list,index)"
      >
        <span class="edit" @click="edit(list,index)">修改</span>
        <span class="check" :class="{checked:list.isDefault}"></span>
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{getPrinvince(list)}}{{getCity(list)}} {{getDistrict(list)}} {{list.address}}</p>
      </li>
    </ul>
    <div class="block stick-bottom-row center">
      <router-link
        class="btn btn-blue js-no-webview-block js-add-address-btn"
        :to="{name:'addressEdit',query:{type:'add'}}"
      >新增地址</router-link>
    </div>
  </div>
</template>
<script>
import _address from "js/addressService";
import axios from "axios";
import addressJson from "@/assets/address.json";
export default {
  data() {
    return {
    };
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    },
    addresslists(){
      return require("@/assets/address.json").list;
    }
  },
  created() {
    if (!this.lists) {
      this.$store.dispatch("getLists");
    }
  },
 // filters 不能拿到外面异步数据,即使 created beforeCreated 可以打印出来
  filters: {},
  methods: {
    getPrinvince(list){
      let index = this.addresslists.findIndex(item => {
        return item.value == list.provinceValue;
      });
      console.log(this.addresslists[index].label);
      
      return this.addresslists[index].label;
    },
    getCity(list){
      let indexP = this.addresslists.findIndex(item => {
        return item.value == list.provinceValue;
      });
       let indexC = this.addresslists[indexP].children.findIndex(item => {
        return item.value === list.cityValue;
      });
      return this.addresslists[indexP].children[indexC].label
    },
    getDistrict(list){
      let indexP = this.addresslists.findIndex(item => {
        return item.value == list.provinceValue;
      });
       let indexC = this.addresslists[indexP].children.findIndex(item => {
        return item.value === list.cityValue;
      });
      let indexD = this.addresslists[indexP].children[indexC].children.findIndex(item => {
        return item.value === list.districtValue;
      });
      return  this.addresslists[indexP].children[indexC].children[indexD].label

    },
    edit(list, index) {
      let [id, name, tel, provinceValue, cityValue, districtValue, address] = [
        list.id,
        list.name,
        list.tel,
        list.provinceValue,
        list.cityValue,
        list.districtValue,
        list.address
      ];
      let instance = {
        id,
        name,
        tel,
        provinceValue,
        cityValue,
        districtValue,
        address
      };
      this.$router.push({
        name: "addressEdit",
        query: {
          type: "edit",
          instance
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.block-list.address-list {
  * {
    text-align: left;
  }
}
</style>


