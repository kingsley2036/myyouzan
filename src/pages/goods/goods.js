import './goods_common.css';
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './good_transition.css'

import Vue from 'vue'
import axios from 'axios'
import url from "js/api";
import qs from 'qs'
import mixin from "js/mixin";
import swiper from "../../components/swiper";


let {id}=qs.parse(location.search.substr(1));
let detailTab=['商品详情','本店成交'];
new Vue({
  el:'#app',
  data:{
    details:null,
    id,
    detailTab,
    tabIndex:0,
    dealList: null,
    bannerlists:[],
    skuType:1,
    showSku:false
  },
  components:{
    swiper
  },
  created(){
    this.getDetails();

  },
  methods:{
    getDetails(){
      axios.get(url.details,{
        params:{
          id:this.id
        }
      }).then((res)=>{
        this.details=res.data.data;
        this.details.imgs.forEach((item)=>{
          this.bannerlists.push({
            clickUrl:'',
            img:item,
          });
        })


      }).catch((err)=>{
        console.log(err)

      })

    },
    changeTab(index){
      this.tabIndex=index;
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
    },
    chooseSku(type){
      this.skuType=type;
      this.showSku=true;

    },

  },
  watch:{
    showSku(val,oldval){

      document.body.style.overflow=val ? 'hidden': 'auto';
      document.querySelector('html').style.overflow=val ? 'hidden':'auto';
      document.body.style.height=val ? '100%': 'auto';
      document.querySelector('html').style.height=val ? '100%': 'auto';
    }
  },
  mixins:[mixin]



});

