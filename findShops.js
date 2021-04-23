const fs = require("fs");
const axios = require('axios');

async function fetchRequest(url) {
  return axios.get(url, request).then(response => {
    // console.log('return')
    // console.log(response)
    return response;
  }).catch(err => {
    // console.log(err);
  });
}



let shops = ["Gabes Donut Shop","Donutland","DONUTSSSS","DONUT TEST 1","DONUT TEST 2","DONUT TEST 3","Donutland 2","DONUT TEST 3","DONUT TEST 3","DONUT TEST 3","DONUT TEST 4","DONUT TEST 4","DONUT TEST 5","DonutWorld","donut gabe","donut 2","Testers","Morks Donuts","DonutShopRound1","Glazed","Gabe Shopppp","Ben's Donut Shop","Danke Donuts","Dank Donuts","TomShops","NewShop1","NewShop1","NewShop1","NewDonuts234","NewShop1234","SorryForTheSpam","NoButReallyI'mSorry","HopefullyTheLast","Iwaswrong","TomShopList","The Donut Emporium","Main Street Donuts","Side Street Donuts","McGlazed The American Crazed","Black Market Donuts","Chocolate Factory","Donut Factory","The Daily Donut","Donuts R Us","Donut Factory","Procrastination Nation","The Holy Donut Empire","Les Petits Beignet","Daylight Donuts","Helms Donut","Thomas' test shop 1","EFDonuts","fakestore","fakestore99","Donut Shop 7","anotherstore12","anotherstore122","anotherstore1222","anotherstore12222","anotherstore122222","jams","fins","Les Petits Beignet","EFDonuts","yuppers","Donutopia","null","lol","Dang Good Donuts","Forbidden Donuts"]

let shopsURL = 'https://donutshop-api.herokuapp.com/shops'
let request = {
    method: 'GET',
};

// async function timeout(i) {
//   let inventoryURL = 'https://donutshop-api.herokuapp.com/inventory?id=' + i;
//   console.log(inventoryURL)
//  let data = await fetchRequest(inventoryURL, request)
//  console.log(data)
//  return data
// }


async function forLoop() {
  for (i = 173; i < 176; i++) {
      let url = 'https://donutshop-api.herokuapp.com/inventory?id=' + i

      let data = await fetchRequest(url);
      if(data){
      console.log(data.data.name);
      }else{
        console.log('no match')
      }
  }
//   fs.writeFile("shops.json", JSON.stringify(user), err => {
     
//     // Checking for errors
//     if (err) throw err; 
   
//     console.log("Done writing"); // Success
// });    
}

forLoop();