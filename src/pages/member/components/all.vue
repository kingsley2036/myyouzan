<template>
  <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block"
         v-if="addressList&&addressList.length">

      <a class="block-item js-address-item address-item " :class="{'address-item-default':item.isDefault}"
         @click="toEdit(item)" v-for="(item,index) in addressList">
        <div class="address-title">{{item.name}} {{item.tel}}</div>
        <p>{{item.provinceName}}{{item.cityName}}{{item.districtName}}{{item.address}}</p>
        <a class="address-edit">修改</a>
      </a>
    </div>
    <div v-if="addressList&&!addressList.length">

    </div>
    <div class="block stick-bottom-row center">
      <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" :to="{name:'form',query:{type:'add'}}">
        新增地址
      </router-link>
    </div>
  </div>
</template>

<script>

    import axios from 'axios'
    import url from "js/api";

    export default {
       computed:{
           addressList(){
              return   this.$store.state.lists;
           }
       },
        created() {
            // this.getAddress()
            if(!this.addressList){
                this.$store.dispatch('getLists')
            }

        },
        name: "all",
        methods: {
            toEdit(item) {
                this.$router.push({
                    name: 'form',
                    query: {
                        type: 'edit',
                        instance: item
                    }
                })
            },
            getAddress() {
                axios.get(url.addressList).then(res => {
                    // if(res.data.status===200)
                    this.addressList = res.data.lists
                }).catch(err => {
                    console.log(err)
                })
            }

        }
    }
</script>

<style scoped>
  .address-edit {
    /*border:1px solid red;*/
    position: relative;
    top: -50px;
    right: -92%;
  }

</style>
