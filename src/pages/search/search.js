import 'css/common.css';
import './search.css'
import vue from 'vue'
import axios from 'axios'
import url from "js/api";
import qs from 'qs'

let {keyword, id} = qs.parse(location.search.substr(1))
vue.filter('addPoint', function (num) {
  let value=Math.round(parseFloat(num)*100)/100;
  let arry=value.toString().split('.');
  if (arry.length===1){
    value=value.toString()+'.00';
    return value;
  }else{
    if(arry[1].length<2){
      value=value.toString()+'0';
    }
    return value;
  }
});
new vue({
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
      if(document.body.scrollTop > 10){
        this.isShow=true
      }else {
        this.isShow=false;
      }
    }

  },

});
