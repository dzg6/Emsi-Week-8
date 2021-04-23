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

    //Connects to the sale html form
    placeOrder(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        let type = formData.get('donut');
        let count = formData.get('inventory');
        super.placeOrder(type, count, (data) => {
            if(data.success){
                this.updateStore()
            }else{
                console.error(data.error)
            }
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
            }else{
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
            }else{
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
            }else{
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
            }else{
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
        console.log(name)
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
        console.log(msg)
        document.getElementById("applicationMessage").innerHTML = msg;
    }
    
    //Prints the revenue 
    printRevenue(revenue, tax, total){
        document.getElementById("revenue").innerHTML = revenue;
        document.getElementById("salesTax").innerHTML = tax;
        document.getElementById("total").innerHTML = total;
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
        document.getElementById("donutList").innerHTML = table;
    }

}