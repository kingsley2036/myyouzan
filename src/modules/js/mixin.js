import Foot from "../../components/Foot";
let mixin={
  components:{
    Foot
  },
  filters:{
    addPoint(num){
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
    }
  },
};
export default mixin
