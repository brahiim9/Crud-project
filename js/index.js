
var productNameInput =document.getElementById('productName');
var productPriceInput =document.getElementById('productPrice');
var productCategoryInput =document.getElementById('productCategory');
var productImageInput =document.getElementById('productImage');
var productDescInput =document.getElementById('productDesc');
var searchProductInput =document.getElementById('search');
var productList = [];
var addbtn =document.getElementById('addbtn');
var updatebtn =document.getElementById('updatebtn');
var updatedIndex =0;

if(localStorage.getItem('productList') !=null){
    
    productList =JSON.parse(localStorage.getItem('productList')) 
    showAllData(productList);
}


function addProduct(){

    console.log(productImageInput.files[0].name);
  var product ={
    name:productNameInput.value,
    price:productPriceInput.value,
    category:productCategoryInput.value,
    image:`images/products/${productImageInput.files[0]?.name}`,
    desc:productDescInput.value 
  }

  productList.push(product);
  localStorage.setItem('productList',JSON.stringify(productList));
  clear();
  showLastIndex();
  
  console.log(productList);

}

function clear(){
    productNameInput.value= null;
    productPriceInput.value= null;
    productCategoryInput.value= null;
    productImageInput.value= null;
    productDescInput.value= null;
}

function showLastIndex(){
    var container =`` ;
    var lastIndex =productList.length-1;
    container =`<tr>    
                 <td>${lastIndex+1}</td>
                 <td>${productList[lastIndex].name}</td>
                 <td>${productList[lastIndex].price}</td>
                 <td>${productList[lastIndex].category}</td>
                 <td><img src="${productList[lastIndex].image}" width="100" alt="mobils"></td>
                 <td>${productList[lastIndex].desc}</td>
                 <td>
                   <button onclick="deleteProduct(${lastIndex});" class="btn btn-danger btn-sm">delete</button>
                   <button onclick="setFormForUpdate(${lastIndex});" class="btn btn-warning btn-sm">update</button>
                 </td>
                </tr>`
   
    document.getElementById('tbody').innerHTML+=container;            
}
function showAllData(list ,term){
    var container =`` ;
    for(var i=0; i<list.length; i++){
                     
    container +=`<tr>    
    <td>${i+1}</td>
    <td>${term ? list[i].name.replaceAll(term.toLowerCase(),`<span class="bg-danger text-warning fw-bolder">${term.toLowerCase()}</span>`) : list[i].name}</td>
    <td>${list[i].price}</td>
    <td>${list[i].category}</td>
    <td><img src="${list[i].image}" width="85" alt="mobils"></td>
    <td>${list[i].desc}</td>
    <td>
      <button onclick="deleteProduct(${i});"  class="btn btn-danger btn-sm">delete</button>
      <button onclick="setFormForUpdate(${i});" class="btn btn-warning btn-sm">update</button>
    </td>
   </tr>`

    }
    document.getElementById('tbody').innerHTML=container;            
}

function searchProduct(){
 var searchProductArr=[];

 for (var i=0 ; i <productList.length ; i++) {
    if(productList[i].name.toLowerCase().includes(searchProductInput.value.toLowerCase())  ){
        searchProductArr.push(productList[i]);
    }
 }

    showAllData(searchProductArr ,searchProductInput.value);

}

function deleteProduct(index){
    productList.splice(index,1);
    localStorage.setItem('productList',JSON.stringify(productList));
    showAllData(productList);
}

function setFormForUpdate(index){
    productNameInput.value = productList[index].name;
    productPriceInput.value = productList[index].price;
    productCategoryInput.value = productList[index].category;
    productDescInput.value = productList[index].desc;

    addbtn.classList.replace("d-block","d-none");
    updatebtn.classList.replace("d-none","d-block");

    updatedIndex = index;
}

function updateProduct(){
    productList[updatedIndex].name = productNameInput.value;
    productList[updatedIndex].price = productPriceInput.value;
    productList[updatedIndex].category = productCategoryInput.value;
    productList[updatedIndex].desc = productDescInput.value;

    addbtn.classList.replace("d-none","d-block");
    updatebtn.classList.replace("d-block","d-none");

    localStorage.setItem('productList',JSON.stringify(productList));
    showAllData(productList);
    clear();

}