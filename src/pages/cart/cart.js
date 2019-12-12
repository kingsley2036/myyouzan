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
    total: 0,
    editShop:null,
    editShopIndex:-1,
    removeData:null,
    removePopup:false

  },
  created() {
    this.getLists()
  },
  computed: {
    allSelected: {
      get() {
        if (this.lists && this.lists.length) {
          return this.lists.every((shop) => {
            return shop.checked
          })
        }
        return false;
      },
      set(newVal) {
        this.lists.forEach((shop) => {
          shop.checked = newVal;
          shop.goodsList.forEach((goods) => {
            goods.checked = newVal;
          })
        })

      }
    },
    countPrice:function () {
     if (this.lists && this.lists.length ){
       let arry=[];
       let total=0;
       this.lists.forEach((shop)=>{
         shop.goodsList.forEach((goods)=>{
           if (goods.checked){
             arry.push(goods);
             total+=goods.number*goods.price;
           }
         })
       });
       this.total=total;
       return  arry;
     }

     return [];
    },
    allRemoveSelected:{
      get(){
        if(this.editShop){
         return this.editShop.removeChecked
        }
        return  false;

      },
      set(newVal){
       if(this.editShop)
         this.editShop.removeChecked=newVal;
         this.editShop.goodsList.forEach((goods)=>{
           goods.removeChecked=newVal
         })
      }

    },
    removeList(){
      let arr=[];
      if(this.editShop){

        this.editShop.goodsList.forEach((goods)=>{
          if(goods.removeChecked){
            arr.push(goods)
          }
        });
        return arr;
      }
      return arr;

    }



  },

    methods: {
      getLists() {
        axios.get(url.carLists)
          .then((res) => {
            let lists = res.data.cartList;
            lists.forEach((shop) => {
              shop.checked = true;
              shop.removeChecked=false;
              shop.editing=false;
              shop.editMsg='编辑';
              shop.goodsList.forEach((goods) => {
                goods.checked = true;
                goods.removeChecked=false;
              })
            });
            this.lists = lists;

          })

      },
      chooseGoods(shop, goods) {
        let attr=this.editShop? 'removeChecked':'checked';
        goods[attr] = !goods[attr];
        shop[attr] = shop.goodsList.every((goods) => {
          return goods[attr]
        })
      },
      chooseShop(shop) {
        let attr=this.editShop? 'removeChecked':'checked';
        console.log(attr);
        shop[attr] = !shop[attr];
        shop.goodsList.forEach((goods) => {
          goods[attr] = shop[attr]
        })
      },
      chooseAll() {
        let attr=this.editShop?'allRemoveSelected':'allSelected';
        this[attr] = !this[attr];
      },
      edit(shop,shopIndex){
        shop.editing=!shop.editing;
        shop.editMsg=shop.editing?'完成':'编辑';
        this.editShop= shop.editing? shop:null;
        this.editShopIndex=shop.editing ? shopIndex:-1;
        this.lists.forEach((item,i)=>{
          if(i!==shopIndex){
            item.editing=false;
            item.editMsg=shop.editing?'':'编辑';
          }
        })


      },
      addNum(goods){
        axios.post(url.cartAdd,{
          id:goods.id,
          number:1
        }).then((res)=>{
          goods.number++
        })

      },
      reduceNum(goods){
        if(goods.number===1) return;
        axios.post(url.cartReduce,{
          id:goods.id,
          number:1
        }).then((res)=>{
          goods.number--;
        })
      },
      remove(shop,shopIndex,goods,goodsIndex){
        this.removePopup=true;
        this.removeData={shop,shopIndex,goods,goodsIndex}

      },
      removeConfirm(){
        let {shop,shopIndex,goods,goodsIndex}=this.removeData;
        axios.post(url.cartRemove,{
          id:goods.id
        }).then(res=>{
          shop.goodsList.splice(goodsIndex,1);
          if(!shop.goodsList.length){
            this.lists.splice(shopIndex,1)
            this.removeShop();
          }
        });
        this.removePopup=false;
      },
      removeShop(){
        this.editShop=null;
        this.editShopIndex=-1;
        this.lists.forEach(shop=>{
          shop.editMsg='编辑';
          shop.editing=false;
        })
      }
    },
    mixins: [mixin]

  });
