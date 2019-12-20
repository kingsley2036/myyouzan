
import addressJson from 'js/address.json';
import axios from 'axios'
import url from "js/api";

export default {
  data() {
    return {
      name: '',
      tel: '',
      provinceValue: -1,
      cityValue: -1,
      districtValue: -1,
      address: '',
      id: '',
      type: '',
      instance: '',
      addressData: addressJson,
      cityList: null,
      districtList: null,
    }
  },
  created() {
    let query = this.$route.query;
    this.type = query.type;
    this.instance = query.instance;
    if(this.type==='edit'){
      let ad=this.instance;
      this.provinceValue=parseInt(ad.provinceValue);
      this.name=ad.name;
      this.tel=ad.tel;
      this.address=ad.address;
      this.id=ad.id;
    }

  },
  computed:{
    lists(){
     return  this.$store.state.lists;

    }

  },
  methods:{
    saveAddress(){

      let {name,tel,provinceValue,cityValue,districtValue,address}=this;
      let data={name,tel,provinceValue,cityValue,districtValue,address};

      if(this.type==='add'){

        // axios.post(url.addressAdd,data).then(res=>{
        //   this.$router.go(-1)
        //   }
        //
        // )
        this.$store.dispatch('addAuction',data)
      }
      if(this.type==="edit"){
        data.id=this.id;
        console.log(data);
        this.$store.dispatch('updateAuction',data)
        // axios.post(url.addressUpdate,data).then(res=>{
        //     this.$router.go(-1)
        // }
        //
        // )

      }

    },
    remove(){
      if(window.confirm('确认删除吗?')){
        // axios.post(url.addressRemove,{
        //   id:this.id}).then(res=>{
        //   this.$router.go(-1)
        //   }
        // )
        this.$store.dispatch('removeAuction',this.id)
      }
    },
    setDefault(){
      this.$store.dispatch('setDef',this.id)
      // axios.post(url.addressDefault,{
      //   id:this.id
      // }).then(res=>{
      //     this.$router.go(-1)
      //   }
      // )
    }

  },
  watch: {
    lists:{
      handler(){
        this.$router.go(-1);
      },
      deep:true

    },
    provinceValue(val) {
      if (val === -1) return;
      let list = this.addressData.list;
      let index = list.findIndex(item => {
        return item.value === val
      });
      this.cityList = list[index].children;
      this.cityValue = -1;
      this.districtValue = -1;
      if(this.type==='edit'){
        this.cityValue=parseInt(this.instance.cityValue)
      }

    },
    cityValue(val) {
      if (val === -1) return;
      let list = this.cityList;
      let index = list.findIndex(item => {
        return item.value === val
      });

      this.districtList = list[index].children;
      this.districtValue = -1;
      if(this.type==='edit'){
        this.districtValue=parseInt(this.instance.districtValue)
      }
    }

  }
}
