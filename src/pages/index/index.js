import 'css/common.css'
import './index.css'
import Vue from 'vue'
import axios from 'axios'
import url from '../../modules/js/api.js'


let app=new Vue({
  el: '#app',
  data: {
    lists: []
  },
  created() {
    axios.post(url.hotLists, {
      pageNum: 1,
      pageSize: 5
    }).then((res) => {
      this.lists = res.data.lists
    })

  }

})
