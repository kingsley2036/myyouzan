let url = {
  hotLists:'/index/hotLists',
  bannerlists:'/index/banner',
  topList: '/category/topList',
  rank:'/category/rank',
  subList:'/category/subList',
  searchList:'/search/list',
  details:'/goods/details',
  dealList:'/goods/deal',
  cartAdd:'/cart/add',
  carLists:'/cart/list',
  cartUpdate:'/cart/update',
  cartReduce:'/cart/reduce',
  cartRemove:'/cart/remove',
  cartMrremove:'/cart/mrremove'

};

let host = 'http://rap2api.taobao.org/app/mock/7058';

for (let key in url){
  if(url.hasOwnProperty(key)){
    url[key]=host + url[key]
  }
}



export default url
