import { API } from './api.js'


/*
*   POS 
*
*   Pos is an asynchournous wrapper that wraps around all the API requests functions
*/
export class POS extends API {
    constructor(id) {
        super(id);
        this.revenue = 0;
        this.donuts = {};
        this.name = "";
        this.order = {};
        this.promo = {total: 0, count: 0};
        this.totalCount = 0;
    }


    //UpdateStore is a reoccuring callback that is found on site-hooks.js
    async createDonut(type, price, count, updateStore) {
        let data = await super.createDonut(type, price);
        if(data.success){
            data = await super.addInventory(type, count);
            updateStore(data);
        }else{
            updateStore(data)
        }
    }
    async createStore(name, updateStore) {
        let data = await super.createStore(name);
        updateStore(data);
    }
    async deleteDonut (type, updateStore) {
        const data = await super.deleteDonut(type);
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
        if(count <= this.donuts[type].count){
        const data = await super.placeOrder(type,count);
        updateStore(data);
        }else{
            const data = {error : ' Not enough donuts to sale'};
            updateStore(data)
        }
    
    }
    async refund(type, count, updateStore) {
        console.log(this.revenue)
        let refundTotal = count * this.donuts[type].price;
        console.log(refundTotal)
        if(refundTotal <= this.revenue){
        const data = await super.refund(type,count);
        updateStore(data);
        }else{
            const data = {error : ' Not enough donuts to refund'};
            updateStore(data)
        }
    
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
        data.donuts.forEach(donut => {
            this.donuts[donut.type] = donut;
        });

        this.name = data.name;
        printCallback(data.name, data.donuts);
    }

    async  getRevenue(printCallback) {
        const data = await super.getRevenue();
        //getSalesTax is a local api that runs on nodeJs. You must be locally running node "server.js" for this to work
        let tax = await super.getSalesTax(data.revenue);
        let total = Number(data.revenue) + Number(tax.salesTax);
        this.revenue = Number(data.revenue);
        tax = Number(tax.salesTax).toFixed(2)

        printCallback(data.revenue.toFixed(2), tax, total.toFixed(2))
    }
    
}