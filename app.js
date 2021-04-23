import { StoreHooks } from './js/site-hooks.js'


//Start the Store
let store = new StoreHooks(null);
store.getShops();

//Login Event Listener Events
document.getElementById("createStore").addEventListener("submit", createStore);
document.getElementById("logout").addEventListener("submit", logout);
document.getElementById("login").addEventListener("submit", login);

//Store Button Event Listeners
document.getElementById("createDonut").addEventListener("submit", (e) => { store.createDonut(e) });
document.getElementById("inventory").addEventListener("submit", (e) => { store.addInventory(e) });
document.getElementById("pos").addEventListener("submit", (e) => { store.placeOrder(e) });
document.getElementById("edit").addEventListener("submit", (e) => { store.editDonut(e) });
document.getElementById("refund").addEventListener("submit", (e) => { store.refund(e) });

//Create the store
function createStore(e) {
    e.preventDefault();
    store.createStore(e, (storeId) => {
        store.id = storeId;
        store.updateStore();
        loadStore(store)
    })

}

//Store Login
function login(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    let storeId = formData.get('storeId');

    console.log(store)
    store.loading = true;
    // store.applicationMessage('loading...')
    LoadingAnimation();
    store.getShopId(storeId, (data)=>{
        if(data){
        store.loading = false;
        store.applicationMessage('Store Loaded');
        store.id = data.id
        store.updateStore();
        console.log(store)
        loadStore()
        }else{
            store.loading = false;
            store.applicationMessage('Shop name does not exist.');
        }
    });
   

}


function LoadingAnimation() {
    let timer;
    let x = 0;
    function animation() {
        if (store.loading == false) {
            clearInterval(timer)
        } else {
            let element = x % 3;
            element = element == 0 ? "Looking for Donut Shop." : element == 1 ? "Looking for Donut Shop.." : element == 2 ? "Looking for Donut Shop..." : null;
            store.applicationMessage(element);
            x++
            timer = setTimeout(animation, 1000);
        }
    }
    animation();
}

//Logs out of the store
function logout(e) {

    e.preventDefault();
    store.getShops();

    document.getElementById("store").classList.add("hide")
    document.getElementById("store").classList.remove("logged")
    document.getElementById("landing-form").classList.remove("hide")
    // document.getElementById("createStore").classList.remove("hide")

}


//Loads the store
function loadStore() {

    //Hide Login
    document.getElementById("store").classList.remove("hide")
    document.getElementById("store").classList.add("logged")
    document.getElementById("landing-form").classList.add("hide")
    // document.getElementById("createStore").classList.add("hide")



}