import 'css/common.css';
import './search.css'
import Vue from 'vue'
import axios from 'axios'
import url from "js/api";
import qs from 'qs'
import velocity from 'velocity-animate'
import mixin from "js/mixin";

let {keyword, id} = qs.parse(location.search.substr(1));

new Vue({
  el: '.container',
  data: {
    keyword,
    id,
    searchList: null,
    isShow:false,

  },
  created() {
    this.getSearchlist()
  },
  methods: {
    getSearchlist() {
      axios.get(url.searchList, {
        params: {
          keyword: this.keyword,
          id: this.id
        }
      }).then((res) => {
        this.searchList = res.data.lists
      }).catch((err) => {
        console.log(err);
      })
    },
    move(){
      if(document.documentElement.scrollTop > 100){
        this.isShow=true
      }else {
        this.isShow=false;
      }
    },
    gotoTop(){
     velocity(document.body,'scroll',{duration:1000})
    }

  },
  mixins:[mixin]

});
