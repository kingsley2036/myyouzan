import 'css/common.css'
import './index.css'
import Vue from 'vue'
import axios from 'axios'
// import url from '../../modules/js/api.js'
import url from "js/api";
import { InfiniteScroll } from 'mint-ui';
import Foot from "components/Foot";
// import Foot from "../../components/Foot";
// import swiper from '../../components/swiper.vue'
import swiper from 'components/swiper.vue'
Vue.use(InfiniteScroll);



let app=new Vue({
  el: '#app',
  data: {
    lists: null,
    loading:false,
    allLoaded:false,
    pageNum:1,
    pageSize:6,
    bannerlists: null
  },
  created() {
  this.getLists();
  this.getbanner();
  },
  methods:{
    getLists(){
      if (this.allLoaded){
        return
      }
      this.loading = true;
      axios.get(url.hotLists, {
        params:{
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }

      }).then((res) => {
        let curLists=res.data.lists;
        if(curLists.length < 6){
          this.allLoaded=true;
        }
        if(this.lists){
          this.lists = this.lists.concat(curLists);

        }else{
          //第一次加载数据
          this.lists = curLists;
        }
        this.pageNum++;
        this.loading = false;

      })

    },
    getbanner(){
      axios.get(url.bannerlists).then(res=>{
      this.bannerlists=res.data.lists
      }
    )}





  },
  components:{
    Foot,
    swiper
  }

})
