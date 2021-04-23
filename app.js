import { API } from './js/api.js'
import { StoreHooks } from './js/site-hooks.js'

//Hooks
document.getElementById("login").addEventListener("submit", login);
document.getElementById("createStore").addEventListener("submit", createStore);
document.getElementById("logout").addEventListener("submit", logout);


//Create the store
function createStore(e) {
    e.preventDefault();

    let newStore = new StoreHooks(null);
    newStore.createStore(e, (storeId) => {
        console.log("Store ID is " + storeId)
        console.log("better write it down :P")
        newStore.id = storeId;
        newStore.updateStore();
        loadStore(newStore)
    })

}

//Store Login
function login(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    let storeId = formData.get('storeId');

    let shop = new StoreHooks(storeId);
    shop.updateStore();

    loadStore(shop)

}

//Logs out of the store
function logout(e) {

    e.preventDefault();

    document.getElementById("store").classList.add("hide")
    document.getElementById("store").classList.remove("logged")
    document.getElementById("login").classList.remove("hide")
    document.getElementById("createStore").classList.remove("hide")

}


//Loads the store
function loadStore(shop) {

    //Hide Login
    document.getElementById("store").classList.remove("hide")
    document.getElementById("store").classList.add("logged")
    document.getElementById("login").classList.add("hide")
    document.getElementById("createStore").classList.add("hide")

    //Display Store
    document.getElementById("createDonut").addEventListener("submit", (e) => { shop.createDonut(e) });
    document.getElementById("inventory").addEventListener("submit", (e) => { shop.addInventory(e) });
    document.getElementById("pos").addEventListener("submit", (e) => { shop.placeOrder(e) });
    document.getElementById("edit").addEventListener("submit", (e) => { shop.editDonut(e) });
    document.getElementById("refund").addEventListener("submit", (e) => { shop.refund(e) });

}