import { POS } from './pos.js'

/*
* Store Hooks
* 
* An Extension of POS and API classes
* A class of functions that connects to app.js. This class is in charge of extracting form data, passing data onto the POS, and updating the html
* Note: All functions use the html event as its only parameter except for createStore,printing and updating functions.
*/
export class StoreHooks extends POS {
    constructor(id) {
        super(id);
        this.shops = [];
    }

    updateOrder(e){


        let action = e.target.value;
        let donut = document.getElementById('posDonut').value;

        let count = document.getElementById('posInventory').value;
        count = Number(count);
        if(action == 'add' && count <= this.donuts[donut].count && count <= (this.donuts[donut].count - (this.order[donut] ? this.order[donut]:0 ))) {
            this.order[donut] ? this.order[donut] += count : this.order[donut] = 0 + count;
            this.totalCount += count
            this.applicationMessage( count + donut + "'s have been added to the order")
        }else if (action == 'remove' &&  this.order[donut] ){
            count < this.order[donut] ? this.totalCount -= count: this.totalCount -=  0 + this.order[donut];
            count < this.order[donut] ? this.order[donut] -= count : delete this.order[donut];
            this.applicationMessage( count + donut + "'s have been removed from the order")
        }else if( count > (this.donuts[donut].count - (this.order[donut] ? this.order[donut]:0 ))){
            this.applicationMessage('There is not enough inventory for ' + donut)
        }else{
            this.applicationMessage('How many ' + donut + "'s did you want?")
        }
        this.calculateDozen(donut);
        this.printOrder();



    }

    calculateDozen(donut){

        //Add pomo
        if(this.totalCount >= ((this.promo.count + 1) * 12)){
            this.promo.donuts.push(donut);
        }

        // update promo count
        this.promo.count = Math.floor(this.totalCount / 12);

        //remove promo
        if(this.promo.donuts.length > this.promo.count){
            this.promo.donuts.pop();
        }
        
        //update running total
        this.promo.total = 0;
        this.promo.donuts.forEach(donutPrice => {
            this.promo.total += this.donuts[donutPrice].price;
        });
        console.log(this.promo)
    }
    //Connects to the sale html form
    placeOrder(e){
        e.preventDefault();
        let i = 0;
        let p = 0;
        this.revenue += 100;
        console.log(this.revenue)
        Object.keys(this.order).forEach(donut => {
        super.placeOrder(donut, this.order[donut], (data) => {
            i++;
            if (i === Object.keys(this.order).length) {

                if(this.promo.count > 0){
                    console.log(this.revenue)
                                 this.promo.donuts.forEach(donut => {

                        super.refund(donut, 1, (data) => {
                            p++;
                            console.log(data)
                            if( p === this.promo.count){
                                this.updateStore()
                                this.applicationMessage('Promotional order was successfully placed!')
                                this.revenue -= 100;
                            }
    
                    })
                })

            }else{
                this.updateStore()
                this.applicationMessage('Order was successfully placed!')
                this.revenue -= 100;
            }
            }else if (data.error){
                this.applicationMessage(data.error)
                console.error(data.error)
            }
        });
    });

    }

    //Connects to the refund html form
    refund(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        let type = formData.get('donut');
        let count = formData.get('inventory');
        super.refund(type, count, (data) => {
            if(data.success){
                this.updateStore()
                this.applicationMessage('Refund was successfully placed!')
            }else{
                this.applicationMessage(data.error)
                console.error(data.error)
            }
        });
    }

    //Connects to the Inventory html Form 
    addInventory(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        let type = formData.get('donut');
        let count = formData.get('inventory');
        super.addInventory(type, count, (data) => {
            if(data.success){
                this.updateStore()
                this.applicationMessage('Inventory was successfully updated!')
            }else{
                this.applicationMessage(data.error)
                console.error(data.error)
            }
        });
    }

    

    //Connects to the Create Donut html form
    createDonut(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        let type = formData.get('donut');
        let price = formData.get('price');
        let count = formData.get('inventory');
        super.createDonut(type, price, count, (data) => {
            if(data.success){
                this.updateStore()
                this.applicationMessage('Donut was successfully created!')
            }else{
                this.applicationMessage(data.error)
                console.error(data.error)
            }
        });
    }

        //Connects to the Create Donut html form
        deleteDonut(e){
            e.preventDefault();
            const formData = new FormData(e.target);
            let type = formData.get('donut');
            super.deleteDonut(type, (data) => {
                if(data.success){
                    this.updateStore()
                    this.applicationMessage('Donut was successfully deleted!')
                }else{
                    this.applicationMessage(data.error)
                    console.error(data.error)
                }
            });
        }
    

    
    //Connects to the editDonut html form
    editDonut(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        let type = formData.get('donut');
        let price = formData.get('price');
        let count = formData.get('inventory');
        super.editDonut(type, price, (data) => {
            if(data.success){
                this.updateStore()
                this.applicationMessage('Price was successfully updated!')
            }else{
                this.applicationMessage(data.error)
                console.error(data.error)
            }
        });
    }

    //Connects to the createStore html form on the login page
    //This is the only function that uses a callback parameter
    //{loadStore} is a call back that updates the store and loads the store page on app.js
    createStore(e, loadStore){
        e.preventDefault();
        const formData = new FormData(e.target);
        let name = formData.get('storeName');       
        super.createStore(name, (data) => {
            loadStore( data.id)
        });
    }


//---------------------Printing and Updating Functions ----------------/
    getShops(){
        super.getShops((data)=>{
            data.forEach(shop => {
                var optionElement = document.createElement("option");
                optionElement.value = shop;
                document.getElementById("shopNames").appendChild(optionElement);
                
            });
            this.shops = data;
        });
    }
    updateStore(){
        super.getDonuts(this.printDonuts);
        super.getRevenue(this.printRevenue);
    }

    applicationMessage(msg){
        document.getElementById("applicationMessage").innerHTML = msg;
    }
    
    //Prints the revenue 
    printRevenue(revenue, tax, total){
        document.getElementById("revenue").innerHTML = ('$' + revenue);
        document.getElementById("salesTax").innerHTML = ('$' + tax);
        document.getElementById("total").innerHTML = ('$' + total);
    }

    //Prints Order
    printOrder(){
        let table = ""
        let total = 0;

        Object.keys(this.order).forEach(donut => {
            table += "<tr><td> " + donut + " </td><td> " + this.order[donut]
                    + " </td><td> " + Number(this.donuts[donut].price).toFixed(2) + " </td><td> " + Number(this.donuts[donut].price * this.order[donut]).toFixed(2) +  "</td></tr>";
            total += (this.donuts[donut].price * this.order[donut]);
        });
        let tax = total *.06;
        if(this.promo.total > 0){
        total = total - this.promo.total;
        table += "<tr class='promo'><td> Promo</td><td> </td><td> </td><td>-" +  Number(this.promo.total).toFixed(2) + "</td></tr>";
        }
        table += "<tr class='tax'><td> Tax</td><td> </td><td> </td><td>" +  Number(tax).toFixed(2) + "</td></tr>";
        table += "<tr class='total'><td> Total</td><td> </td><td> </td><td>" +  Number(total + tax).toFixed(2) + "</td></tr>";
        document.getElementById("orderList").innerHTML = table;
    }

    //Prints all the special donut Options and table
    printDonuts(name, donuts){
        let select = "";
        let table = ""

        donuts.forEach(donut => {
            select += "<option value=\'" + donut.type + "\' > " + donut.type + "</option>";
            table += "<tr><td> " + donut.type + " </td><td> " + donut.count 
                    + " </td><td> " + donut.price + " </td></tr>";
        });

        document.getElementById("shopName").innerHTML = name;
        document.getElementById("inventoryDonut").innerHTML = select;
        document.getElementById("editDonut").innerHTML = select;
        document.getElementById("posDonut").innerHTML = select;
        document.getElementById("refundDonut").innerHTML = select;
        document.getElementById("deleteDonut").innerHTML = select;
        document.getElementById("donutList").innerHTML = table;
    }

}