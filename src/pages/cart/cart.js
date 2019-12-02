import './cart_base.css';
import './cart.css';
import './cart_trade.css'

import Vue from 'vue'
import axios from 'axios'
import url from "js/api";
import qs from 'qs'
import mixin from "js/mixin";

new Vue({
  el: '.container',
  data: {
    lists: null,
  },
  created() {
    this.getLists()
  },
  computed: {
    allSelected:{
      get(){
        if(this.lists && this.lists.length){
          return this.lists.every((shop)=>{
            return  shop.checked
          })
        }
        return false;

      },
      set(newVal){
        this.lists.forEach((shop)=>{
          shop.checked=newVal;
          shop.goodsList.forEach((goods)=>{
            goods.checked=newVal;
          })
        })

      }
    }
  },
  methods: {
    getLists(){
      axios.get(url.carLists)
        .then((res)=>{
          let lists=res.data.cartList;
          lists.forEach((shop)=>{
            shop.checked=true;
            shop.goodsList.forEach((goods)=>{
              goods.checked=true;
            })
          });
          this.lists=lists;

        })

    },
    chooseGoods(shop,goods){
      goods.checked=!goods.checked;
      shop.checked=shop.goodsList.every((goods)=>{
        return goods.checked
      })
    },
    chooseShop(shop){
      shop.checked=!shop.checked;
      shop.goodsList.forEach((goods)=>{
        goods.checked=shop.checked
      })
    },
    chooseAll(){
      this.allSelected=!this.allSelected;
    }
  },
  mixins: [mixin]

});
