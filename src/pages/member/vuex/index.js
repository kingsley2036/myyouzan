import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import url from "js/api";

Vue.use(Vuex);

//创建STORE实例
const store = new Vuex.Store({
  //数据存储
  state: {
    lists: null
  },
  //同步函数
  mutations: {
    init(state,lists) {
     //state是为了方便拿到上面的数据
      state.lists=lists;
    },
    add(state,instance){
      state.lists.push(instance);
    },
    remove(state,id){
      let lists=state.lists;
      let index=lists.findIndex(item=>{
        return  item.id===id;
      });
      state.lists.splice(index,1)
    },
    update(state,instance){
      let lists=JSON.parse(JSON.stringify(state.lists));
      let index=lists.findIndex(item=>{
        return  item.id===instance.id;
      });
      lists[index]=instance;
      state.lists=lists;
     
    },
    setDefault(state,id){
      let lists=this.state.lists;
      lists.forEach(item=>{
        item.isDefault= item.id===id ? true:false
      });

    }
  },
  //异步请求
  actions: {
    getLists({commit}){
      axios.get(url.addressList).then(res=>{
       commit('init',res.data.lists)
      });
    },
    addAuction({commit},instance){
      axios.post(url.addressAdd,instance).then(res=>{
        commit('add',instance);
      });
    },
    removeAuction({commit},id){
      axios.post(url.addressRemove,{id}).then(res=>{
        console.log('remove');
        commit('remove',id)
      });
    },
    updateAuction({commit},instance){
       axios.post(url.addressUpdate,instance).then(res=>{
         commit('update',instance)
       });
    },
    setDef({commit},id){
      axios.post(url.addressDefault,id).then(res=>{
        commit('setDefault',id);
      });
    }
  }

});
export default store;
