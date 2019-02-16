import Vue from "vue";
import Vuex from "vuex";
import addressJson from "@/assets/address.json";
import _address from "js/addressService.js";

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        lists:null,
        addList:addressJson.list
     },
     mutations:{
        init(state,lists){
           state.lists = lists
        },
        update(state,{id,list}){
            let lists = state.lists;
            let index = lists.findIndex(item => {
                return id === item.id;
            });
            lists.splice(index,1,list)
        },
        add(state,list){
            // 后端返回id
            let id = parseInt(Math.random()*1000000000)
            let xlist = Object.assign(list,{
                id,
                isDefault:false
            })
            state.lists.push(xlist);
        },
        remove(state,id){
            let lists = state.lists;
            let index = lists.findIndex(item => {
                return id === item.id;
            });
            lists.splice(index,1)
        },
        setDefault(state,id){
            state.lists.forEach(item => {
                item.isDefault = item.id === id ? true : false
            })
        }
     },
     actions:{
        getLists({commit}){
            _address.getAllList().then((lists)=>{
                commit("init",lists)
            })
        },
        updateAction({commit},{id,list}){
            _address.update(id,list).then(()=>{
                commit("update",{id,list})
            })
        },
        addAction({commit},list){
            _address.add(list).then(()=>{
                commit('add',list);
            })
        },
        removeAction({commit},id){
            _address.remove(id).then(()=>{
                commit('remove',id);
            })
        },
        setDefaultAction({commit},id){
            _address.setDefault(id).then(()=>{
                commit('setDefault',id);
            })
        }
     }
})