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
        this.promo = {donuts: [], count: 0, total:0};
        this.totalCount = 0;
    }

    clearStore(){
        this.id=0;
        this.revenue = 0;
        this.donuts = {};
        this.name = "";
        this.order = {};
        this.promo = {donuts: [], count: 0, total:0};
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
        let refundTotal = count * this.donuts[type].price;
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
        let tax = Number(data.revenue * .06);
        let total = Number(data.revenue) + Number(tax);
        this.revenue = Number(data.revenue);
        tax = Number(tax).toFixed(2)

        printCallback(data.revenue.toFixed(2), tax, total.toFixed(2))

    }

    
}