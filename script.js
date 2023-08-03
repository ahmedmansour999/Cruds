// script.js
const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const btnAdd = document.getElementById("btnAdd");
const tbody = document.getElementById("tbody"); 


let mood = 'create' ; 
let trd ; 

// Get the total 
function getTotal() {
    if (price.value !== "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "red";
    } else {
        total.innerHTML = "";
        total.style.background = "rebeccapurple";
    }
}

// Add product 
let addPro = [];

if (localStorage.product != null) {
    addPro = JSON.parse(localStorage.product);
}

btnAdd.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    if (title.value != "" && price.value != "" && category.value != '' && newPro.count < 100) {
        

        if (mood === 'create') {
            if (newPro.count >1) {
                for (let i = 0; i < newPro.count; i++) {
                    addPro.push(newPro);

                }
            }else{
                addPro.push(newPro);
            }
        } else {
            addPro[trd] = newPro ;
            mood = 'create'
            count.style.display = "block" ;
            btnAdd.innerHTML = 'Add Product' ;
        }
        clearData();
    }else{
        alert("Please fill all the fields")
    }
    localStorage.setItem('product', JSON.stringify(addPro));
    showData();
}

// Clear data 
function clearData() {
    title.value = "";
    price.value = "";
    discount.value = "";
    taxes.value = "";
    ads.value = "";
    count.value = "";
    category.value = "";
    total.innerHTML = "";
}

// Show Data 
function showData() {
    // showData() ;
    let table = '';
    for (let i = 0; i < addPro.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${addPro[i].title}</td>
                <td>${addPro[i].price}</td>
                <td>${addPro[i].taxes}</td>
                <td>${addPro[i].ads}</td>
                <td>${addPro[i].discount}</td>
                <td>${addPro[i].total}</td>
                <td>${addPro[i].category}</td>
                <td><button class="btn" id="update" onclick='Update(${i})'>Update</button></td>
                <td><button class="btn" onclick='delPro(${i})' id="delPro">Delete</button></td>
            </tr>
        `;
    }
    tbody.innerHTML = table;

    // Delete All Product 
    let delALL = document.getElementById('delAll');
    if (addPro.length > 0) {
        delALL.innerHTML = `<br><button onclick='delBtn()'>Delete All (${addPro.length}) </button>`;
    } else {
        delALL.innerHTML = '';
    }
}

showData();

// Delete product 
function delPro(i) {
    addPro.splice(i, 1);
    localStorage.product = JSON.stringify(addPro);
    showData();
}

// Delete All 
function delBtn() {
    localStorage.clear();
    addPro = [];
    showData();
}

// updata data 

function Update(i) {
    title.value = addPro[i].title ;
    price.value = addPro[i].price ;
    taxes.value = addPro[i].taxes ;
    ads.value = addPro[i].ads ;
    discount.value = addPro[i].discount ;
    getTotal() 
    category.value = addPro[i].category ;
    count.style.display = "none" ;
    btnAdd.innerHTML = 'Update' ;
    mood = 'update' ;
    scroll({
        top: 0 , 
        behavior:'smooth'
    })
    trd = i ;
}


// search

let searchMood = 'title' ; 

function getSearchMood(id) {
    let search = document.getElementById('search') ;

    if (id == 'searchtitle') {
        searchMood = 'title' ;
    }else{
        searchMood ='category';
    }
    search.placeholder = `search by ${searchMood}` ;
    search.focus() ;
    search.value = '' ;
    showData();
}


function searchData(value) {
    let table = '' ;
    if (searchMood === 'title') {
        for (let i = 0; i < addPro.length; i++) {
            if (addPro[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${addPro[i].title}</td>
                    <td>${addPro[i].price}</td>
                    <td>${addPro[i].taxes}</td>
                    <td>${addPro[i].ads}</td>
                    <td>${addPro[i].discount}</td>
                    <td>${addPro[i].total}</td>
                    <td>${addPro[i].category}</td>
                    <td><button class="btn" id="update" onclick='Update(${i})'>Update</button></td>
                    <td><button class="btn" onclick='delPro(${i})' id="delPro">Delete</button></td>
                </tr>
            `;
            }            
        }
    } else {
        for (let i = 0; i < addPro.length; i++) {
            if (addPro[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${addPro[i].title}</td>
                    <td>${addPro[i].price}</td>
                    <td>${addPro[i].taxes}</td>
                    <td>${addPro[i].ads}</td>
                    <td>${addPro[i].discount}</td>
                    <td>${addPro[i].total}</td>
                    <td>${addPro[i].category}</td>
                    <td><button class="btn" id="update" onclick='Update(${i})'>Update</button></td>
                    <td><button class="btn" onclick='delPro(${i})' id="delPro">Delete</button></td>
                </tr>
            `;
            }            
        }
    }
    tbody.innerHTML = table;

}