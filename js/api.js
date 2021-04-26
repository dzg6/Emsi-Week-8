

export class API {
    constructor(id) {
        this.id = id
        this.loading = false
    }

    //Generic fetch request
    fetchRequest(url, request) {
        this.loading = true;
        return fetch(url, request)
            .then(response => response.json())
            .then(data => { this.loading = false; return data })
            .catch(err => {
                this.loading = false;
                console.error(err);
            });
    }

    /**
    * Get Revenue
    * 
    * @return {JSON} { name: "Morks Donuts", revenue: NUMBER }
    */
    getRevenue() {
        let url = 'https://donutshop-api.herokuapp.com/revenue?id=' + this.id;
        let request = {
            method: 'GET',
        };

        return this.fetchRequest(url, request)
    }

    /**
    * Get Sales Tax
    * 
    * @return {JSON} { name: "Morks Donuts", revenue: NUMBER }
    */
         getSalesTax(revenue) {
            let url = 'http://localhost:3000/salesTax'
            let request = {
                "method": 'POST',
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify({ "revenue": revenue })
            };
    
            return this.fetchRequest(url, request)
        }

    /**
    * Get Inventory
    * 
    * @return {JSON} Javascript object = {name: "Morks Donuts", donuts: [{type, price, count}, {...} ] }
    */
    getInventory() {
        let url = 'https://donutshop-api.herokuapp.com/inventory?id=' + this.id;
        let request = {
            method: 'GET',
        };

        return this.fetchRequest(url, request)
    }

    /**
    * Get Shop Id
    * 
    * @return {JSON} Javascript object = {name: "Morks Donuts", donuts: [{type, price, count}, {...} ] }
    */
         getShopId(name) {
            let url = 'https://donutshop-api.herokuapp.com/shop-id';
            let request = {
                "method": 'POST',
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify({ "name": name })
            };
    
            return this.fetchRequest(url, request)
        }
    

    /**
    * Get Shops
    * 
    * @return {JSON} Javascript object = {name: "Morks Donuts", donuts: [{type, price, count}, {...} ] }
    */
         getAllShops() {
            let url = 'https://donutshop-api.herokuapp.com/shops'
            let request = {
                method: 'GET',
            };
    
            return this.fetchRequest(url, request)
        }


    /**
    * Add Donuts
    * 
    * @param {string} type Name of the donut
    * @param {number} count Number of donuts to add to stock
    * @return {JSON} 200 for success
    */
    addInventory(type, count = 0) {
        
        let url = 'https://donutshop-api.herokuapp.com/add-donuts?id=' + this.id;
        let request = {
            "method": 'POST',
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({ "type": type, "count": Math.floor(count) })
        };

        return this.fetchRequest(url, request)
    }

    /**
    * Create Store
    * 
    * @param {string} type Name of the donut
    * @param {number} price price of donut
    * @return {JSON} 200 for success
    */
    createStore(name) {
            let url = 'https://donutshop-api.herokuapp.com/create-donut-shop';
            let request = {
                "method": 'POST',
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify({ "name": name})
            };
    
            return this.fetchRequest(url, request)
        }

    /**
    * Create Donut
    * 
    * @param {string} type Name of the donut
    * @param {number} price price of donut
    * @return {JSON} 200 for success
    */
    createDonut(type, price) {
        let url = 'https://donutshop-api.herokuapp.com/create-donut-type?id=' + this.id;
        let request = {
            "method": 'POST',
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({ "type": type, "price": Number(price).toFixed(2) })
        };

        return this.fetchRequest(url, request)
    }

    /**
    * Delete Donut
    * 
    * @param {string} type Name of the donut
    * @return {JSON} 200 for success
    */
         deleteDonut(type) {
            let url = 'https://donutshop-api.herokuapp.com/delete-donut?id=' + this.id;
            let request = {
                "method": 'POST',
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify({ "type": type})
            };
    
            return this.fetchRequest(url, request)
        }

    /**
    * Edit Donut
    * 
    * @param {string} type Name of the donut
    * @param {number} price price of donut
    * @return {JSON} 200 for success
    */
         editDonut(type, price) {
            let url = 'https://donutshop-api.herokuapp.com/edit-donut?id=' + this.id;
            let request = {
                "method": 'POST',
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify({ "type": type, "price": Number(price).toFixed(2) })
            };
    
            return this.fetchRequest(url, request)
        }


    /**
     * Place Order
     * 
     * @param {string} type Name of the donut
     * @param {number} count Number of donuts ordered
     * @return {JSON} 200 for success
     */
    placeOrder(type, count = 0) {
        let url = 'https://donutshop-api.herokuapp.com/place-order?id=' + this.id;
        let request = {
            "method": 'POST',
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({ "type": type, "count": Math.floor(count) })
        };

        return this.fetchRequest(url, request)
    }


    /**
     * Refund Order
     * 
     * @param {string} type Name of the donut
     * @param {number} count Number of donuts ordered
     * @return {JSON} 200 for success
     */
         refund(type, count = 0) {
            let url = 'https://donutshop-api.herokuapp.com/refund?id=' + this.id;
            let request = {
                "method": 'POST',
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify({ "type": type, "count": Math.floor(count) })
            };
    
            return this.fetchRequest(url, request)
        }

}