import 'css/common.css'
import './category.css'
import vue from 'vue'
import axios from 'axios'
import url from "js/api";
import Foot from "../../components/Foot";

new vue({
  el:'#app',
  data:{
    toplists:null,
    topIndex:0,
    subData:null
  },
  components:{
    Foot
  },
  created(){
    this.getToplists();
  },
  methods: {
    getToplists(){
      axios.get(url.topList).then(res=>{
        this.toplists=res.data.lists;
        console.log(res)
      })
    },
    getSublist(id,index){
      this.topIndex=index;
      if(index===0){

      }else{
        axios.get(url.subList).then(res=>{
          this.subData=res.data.data;
          console.log(res)
        })
      }
    }
  }
})
