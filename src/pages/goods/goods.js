import './goods_common.css';
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'

import Vue from 'vue'
import axios from 'axios'
import url from "js/api";
import qs from 'qs'
import mixin from "js/mixin";


let {id}=qs.parse(location.search.substr(1));
let detailTab=['商品详情','本店成交'];
new Vue({
  el:'#app',
  data:{
    details:null,
    id,
    detailTab,
    tabIndex:0,
    dealList: null
  },
  created(){
    this.getDetails();
    // this.getDeal()
  },
  methods:{
    getDetails(){
      axios.get(url.details,{
        params:{
          id:this.id
        }
      }).then((res)=>{
        this.details=res.data.data;
      }).catch((err)=>{
        console.log(err)

      })

    },
    changeTab(index){
      this.tabIndex=index
      if (index){
        this.getDeal()
      }
    },
    getDeal(){
      axios.get(url.dealList,{
        params:{id:this.id}
      }).then((res)=>{
        this.dealList=res.data.data.lists

      })
    }
  },
  mixins:[mixin]



});

