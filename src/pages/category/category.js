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
    subData:null,
    rankData:null
  },
  components:{
    Foot
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
    }
   
  },
  filters:{
    addPoint(num){
      var value=Math.round(parseFloat(num)*100)/100;
      var arry=value.toString().split('.');
      if (arry.length==1){
        value=value.toString()+'.00';
        return value;
      }else{
        if(arry[1].length<2){
          value=value.toString()+'0';
        }
        return value;
      }
    }
  }
})
