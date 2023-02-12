"use strict";
//--IMPLEMENT FOREACH, MAP, FILTER USING REDUCE--
// [].forEach();
// [].map()
// [].filter();
// function forEach<T>(array:T[],forEachCall:(item:T)=>void):void{
//     array.reduce((prev,item)=>{
//         forEachCall(item);
//         return undefined
//     },undefined)
// }
// forEach([1,2,3,4,5,6],(e)=>{console.log(`forEach ${e}`)})
function map(array, mapCallBack) {
    let mappedArray = [];
    array.reduce((p, c) => {
        mappedArray.push(mapCallBack(c));
    }, []);
    return mappedArray;
}
console.log(map([1, 2, 3, 4, 5, 6], (el) => el * 2));
// function filter<T>(array: T[], filterCallBack: (value: T) => boolean):T[] {
//   let filteredArray: any[] = [];
//   array.reduce((p: any, c, i) => {
//     if(filterCallBack(c))filteredArray.push(c);
//   }, undefined);
//   return filteredArray;
// }
// console.log(filter([1,2,3,4,5,6,7,8,9,10],(el)=>(el>2)));
