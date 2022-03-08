let carts = document.querySelectorAll(".add-cart");

let products=[
    {
        name:"Blue T-Shirt",
        tag:"BlueT-Shirt",
        price:1500,
        inCart:0,
        imageUrl:"https://media.istockphoto.com/photos/indian-youth-picture-id172935412?k=20&m=172935412&s=612x612&w=0&h=JVjViw6I_lfmnXzTJJxQd3KFHjUyNPYiOh2zFAAMF0Q="
    },
    {
        name:"T-Shirt",
        tag:"TShirt",
        price:1000,
        inCart:0,
        imageUrl:"https://media.istockphoto.com/photos/young-muscular-man-showing-his-muscles-with-smile-picture-id955953318?k=20&m=955953318&s=612x612&w=0&h=ZANnEtqlkWm8Rk7TSUKqwWzACps6K7JOV_mXih1K8rs="
    },
    {
        name:"Casual-Wear",
        tag:"CasualWear",
        price:1200,
        inCart:0,
        imageUrl:"https://media.istockphoto.com/photos/indian-male-in-casual-wear-and-jeans-picture-id524152192?k=20&m=524152192&s=612x612&w=0&h=Ga31VPkmYix1cxCyr4KL3AymkVEaX3UZn0RU4FrvIFs="
    },
    {
        name:"Blue T-Shirt ",
        tag:"BlueT-Shirt",
        price:1500,
        inCart:0,
        imageUrl:"https://media.istockphoto.com/photos/smiling-young-man-showing-double-thumbs-up-picture-id1334287490?k=20&m=1334287490&s=612x612&w=0&h=SknfHjK51e9nJknXzoR6hxqAZrEFkmzzzzDftyVcEWM="
    },
    {
        name:"T-Shirt With Light Blue",
        tag:"T-ShirtWithLightBlue",
        price:700,
        inCart:0,
        imageUrl:"https://media.istockphoto.com/photos/smiling-handsome-man-standing-isolated-on-white-wall-picture-id911865064?k=20&m=911865064&s=612x612&w=0&h=UkIqLZrZd8E2VQHVZgi3_Z9e0OUH6BfDK77tHOS_zPE="
    },
    {
        name:"V-Shaped T-shirt",
        tag:"V-Shaped T-shirt",
        price:900,
        inCart:0,
        imageUrl:"https://media.istockphoto.com/photos/athletic-man-with-dark-hair-and-brown-eyes-picture-id517195851?k=20&m=517195851&s=612x612&w=0&h=JI3ntum8AwryNkERRoJ-G2odn2Rik-16Zk1XSuab4_s="
    },
    {
        name:"White T-Shirt",
        tag:"WhiteT-Shirt",
        price:500,
        inCart:0,
        imageUrl:"https://media.istockphoto.com/photos/happy-young-man-pointing-at-copyspace-or-something-picture-id607759754?k=20&m=607759754&s=612x612&w=0&h=Q5echquojMfTsFTC2_Q2tFjYOAPJiEpHgTVEbW8M1Es="
    },
    {
        name:"Red T-shirt",
        tag:"RedT-shirt",
        price:1300,
        inCart:0,
        imageUrl:"https://media.istockphoto.com/photos/beautiful-black-man-picture-id1078053024?k=20&m=1078053024&s=612x612&w=0&h=qp2D0PJuLruEjEDNTwLreX0-I7paXPzPcRe-24mT0W8="
    },
]

for(let i=0; i<carts.length; i++){
    carts[i].addEventListener("click",()=>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");

    if(productNumbers){
        document.querySelector(".cart span").textContent=productNumbers;
    }
}

function cartNumbers(product){
   
    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);
    
    if(productNumbers){
        localStorage.setItem("cartNumbers",productNumbers+1)
        document.querySelector(".cart span").textContent=productNumbers+1;
    }else{
        localStorage.setItem("cartNumbers",1)
        document.querySelector(".cart span").textContent=1;
    } 
    
    setItems(product);
}

function setItems(product){
    //console.log("the product inside setItem clicked",product);
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){

        if(cartItems[product.tag]==undefined){
            cartItems={
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart += 1;
    }else{
        product.inCart=1;

        cartItems ={
            [product.tag]:product 
        }
    }
    
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}

function totalCost(product){
     //console.log("the product price is",product.price)
     let cartCost = localStorage.getItem("totalCost");
    
     if(cartCost != null){
         cartCost = parseInt(cartCost);
         localStorage.setItem("totalCost",cartCost+product.price)
     }else{
         localStorage.setItem("totalCost",product.price)
     }    
}


function displayCart(){
     let cartItems = localStorage.getItem("productsInCart");
     cartItems = JSON.parse(cartItems);
     let cartCost = localStorage.getItem("totalCost");
     let productContainer = document.querySelector(".products");
     
     

     if(cartItems && productContainer){
         productContainer.innerHTML="";
         
         Object.values(cartItems).map(item=>{
             productContainer.innerHTML += `
                <div class="product">
                    <ion-icon  class="remove" name="close-circle"></ion-icon>
                    <img class="spl" src=${item.imageUrl}>
                    <span>${item.name}</span>
                </div>
                <div class="price">${item.price}.00</div>
                <div class="quantity">
                    <ion-icon  name="arrow-dropleft-circle"></ion-icon>
                    <span>${item.inCart}</span>
                    <ion-icon id="increase" name="arrow-dropright-circle"></ion-icon>
                </div>
                <div class="total">${item.inCart*item.price}.00</div>

            `;
         });
       
         productContainer.innerHTML+=`
           <div class="basketTotalContainer">
              <h4 class="basketTotalTitle">BasketTotal</h4>
              <h4 class="basketTotal">Rs=${cartCost}</h4>
           </div>
         `
     }
}

onLoadCartNumbers();
displayCart();
