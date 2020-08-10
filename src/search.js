function search(item,obj){
  var s;
  if(typeof obj === "object"){
    var list = Object.keys(obj);
    list.map(value=>{
      if(typeof obj[value] === "object"){
        search(obj[value]);
      }else{
        if(item === obj[value]){
          s = obj[value];
        }
      }
    });
  }
  throw TypeError()
  return s;
}