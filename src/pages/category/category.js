import 'css/common.css'
import './category.css'
import vue from 'vue'
import axios from 'axios'
import url from "js/api";
// import Foot from "../../components/Foot";
import mixin from "js/mixin";
new vue({
  el:'#app',
  data:{
    toplists:null,
    topIndex:0,
    subData:null,
    rankData:null
  },

  created(){
    this.getToplists();
    this.getSublist(0,0);
  },
  methods: {
    getToplists(){
      axios.get(url.topList).then(res=>{
        this.toplists=res.data.lists;

      });
    },
    getSublist(id,index){
      this.topIndex=index;
      if(index===0){
        this.getRank();
      }else{
        axios.get(url.subList,{id:id}).then(res=>{
          this.subData=res.data.data;

        });
      }
    },
    getRank(){
      axios.get(url.rank).then(res=>{

        this.rankData=res.data.data;
        console.log(res.data.data)
      });
    },
    toSearch(list){
      location.href=`search.html?keyword=${list.name}&id=${list.id}`;
      // window.event.returnValue=false;
    }

  },

  mixins:[mixin]
});
