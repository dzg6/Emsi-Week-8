import { API } from './api.js'


/*
*   POS 
*
*   Pos is an asynchournous wrapper that wraps around all the API requests functions
*/
export class POS extends API {
    constructor(id) {
        super(id);
    }


    //UpdateStore is a reoccuring callback that is found on site-hooks.js
    async createDonut(type, price, count, updateStore) {
        console.log(type)
        console.log(price)
        // let data = await super.createDonut(type, price);
        // if(data.success){
        //     data = await super.addInventory(type, count);
        //     updateStore(data);
        // }else{
        //     updateStore(data)
        // }
    }
    async createStore(name, updateStore) {
        let data = await super.createStore(name);
        updateStore(data);
    }

    async editDonut(type, price, updateStore) {
        const data = await super.editDonut(type, price);
        updateStore(data);
    }
    async addInventory(type, count, updateStore) {
        const data = await super.addInventory(type,count);
        updateStore(data);
    
    }

    async placeOrder(type, count, updateStore) {
        const data = await super.placeOrder(type,count);
        updateStore(data);
    
    }
    async refund(type, count, updateStore) {
        const data = await super.refund(type,count);
        updateStore(data);
    
    }

    //------- Update Store Functions ----/
    async getShops(printCallback) {
        const data = await super.getAllShops();
        printCallback(data);
    }
    async getShopId(name, printCallback) {
        const data = await super.getShopId(name);
        printCallback(data);
    }

    async getDonuts(printCallback) {
        const data = await super.getInventory();
        printCallback(data.name, data.donuts);
    }

    async  getRevenue(printCallback) {
        const data = await super.getRevenue();
        //getSalesTax is a local api that runs on nodeJs. You must be locally running node "server.js" for this to work
        const tax = await super.getSalesTax(data.revenue);
        let total = Number(data.revenue) + Number(tax.salesTax);

        printCallback(data.revenue, tax.salesTax, total)
    }
    
}