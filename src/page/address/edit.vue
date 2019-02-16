<template>
  <div class="container">
    <div class="section section-first">
      <div class="block form js-form">
        <input class="js-id" name="id" type="hidden" value>
        <div class="block-item" style="border-top:0;">
          <label>收货人</label>
          <input type="text" placeholder="请输入姓名" name="user_name" v-model="name" maxlength="20">
        </div>
        <div class="block-item">
          <label>联系电话</label>
          <input type="tel" placeholder="联系电话" name="tel" v-model="tel" maxlength="11">
        </div>
        <div class="block-item">
          <label>选择地区</label>
          <div class="select-group">
            <select class="js-province-selector" v-model="provinceValue">
              <option value="-1">选择省份</option>
              <option
                v-for="item in provinceList"
                :value="item.value"
                :key="item.value"
              >{{item.label}}</option>
            </select>
            <select class="js-city-selector" v-model="cityValue">
              <option value="-1">选择城市</option>
              <option v-for="item in cityList" :key="item.value" :value="item.value">{{item.label}}</option>
            </select>
            <select class="js-county-selector" name="area_code" v-model="districtValue">
              <option value="-1">选择地区</option>
              <option
                v-for="item in districtList"
                :value="item.value"
                :key="item.value"
              >{{item.label}}</option>
            </select>
          </div>
        </div>
        <div class="block-item">
          <label>详细地址</label>
          <input
            type="text"
            placeholder="街道门牌信息"
            name="address_detail"
            v-model="address"
            maxlength="100"
          >
        </div>
      </div>
    </div>
    <div class="block section js-save block-control-btn" @click="save">
      <div class="block-item c-blue center">{{ type ==="add" ?'添加': '修改'}}</div>
    </div>
    <div class="block section js-delete block-control-btn" v-show="type=='edit'" @click="remove">
      <div class="block-item c-red center">删除</div>
    </div>
    <div class="block stick-bottom-row center js-save-default" v-show="type=='edit'">
      <button class="btn btn-standard js-save-default-btn" @click="setDefaultEvent">设为默认收货地址</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: "",
      name: "",
      tel: "",
      provinceValue: -1,
      cityValue: -1,
      districtValue: -1,
      address: "",
      type: "",
      instance: null,
      addressJson: null,
      provinceList: null,
      cityList: null,
      districtList: null,

      // 控制第一次进来
      addFirst:true,
      addFirst1:true
    };
  },
  watch: {
    lists:{
      handler(){
        this.$router.go(-1)
      },
      deep:true
    },
    provinceValue(val) {
      if(val != -1){
        let index = this.provinceList.findIndex(item => {
          return item.value === val;
        });
        this.cityList = this.provinceList[index].children;
      }
      if(this.addFirst){
        this.addFirst = false
      }else{
        this.cityValue = "-1";
        this.districtValue = "-1";
      }
    },
    cityValue(val) {
      if(val != -1){
        let index = this.cityList.findIndex(item => {
          return item.value === val;
        })
        this.districtList = this.cityList[index].children;
      }
      if(this.addFirst1){
        this.addFirst1 = false
      }else{
        this.districtValue = "-1";
      }
    }
  },
  created() {
    if(!this.lists){
      this.$store.dispatch("getLists");
    }
    this.type = this.$route.query.type;
    if (this.type === "edit") {
      this.instance = this.$route.query.instance;
      for (let key in this.instance) {
        let val = this.instance[key];
        if (
          key === "provinceValue" ||
          key === "cityValue" ||
          key === "districtValue"
        ) {
          val = parseInt(val);
        }
        this[key] = val;
      }
    }
    this.addressJson = require("@/assets/address.json");
    this.provinceList = this.addressJson.list;
  },
  computed:{
    lists(){
      return this.$store.state.lists;
    }
  },
  methods: {
    setDefaultEvent() {
      this.$store.dispatch("setDefaultAction",this.id)
    },
    save() {
      let {id, name, tel, provinceValue, cityValue, districtValue, address } = this;
      // 校验
      if (!name.trim()) {
        alert("请填写姓名");
        return;
      }
      if (!/\d{11}/.test(tel)) {
        alert("请输入合法的手机号");
        return;
      }
      if (provinceValue == -1) {
        alert("请选择省");
        return;
      }
      if (cityValue == -1) {
        alert("请选择市");
        return;
      }
      if (!address.trim()) {
        alert("请填写详细地址");
        return;
      }
      // 校验end！
      let list = {id, name, tel, provinceValue, cityValue, districtValue, address };

      if (this.type === "add") {
        this.$store.dispatch("addAction",list);
      } else if (this.type === "edit") {
        this.$store.dispatch("updateAction",{id,list});
      }
    },
    remove() {
      this.$store.dispatch('removeAction',this.id)
    }
  }
};
</script>
<style lang="scss" scoped>
.btn-standard {
  background-color: #ff5050;
  color: #fff;
  border: 1px solid transparent;
}
</style>



