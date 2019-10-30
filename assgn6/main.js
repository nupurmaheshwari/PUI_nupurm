class cartItem{
    //create constructor for cartItems class
    constructor(image, quantity, price, glaze, name)
    {
        this.image = image
        this.quantity = quantity
        this.price = price
        this.glaze = glaze
        this.name = name
    }
}

//create new cartItems instance if there is none
if (localStorage.getItem("cartItems") == undefined) {
    var cart = new Array();
}
else {
    cart = JSON.parse(localStorage.getItem("cartItems"));
}



$( document ).ready(function() {

    // select a number of buns
    $(document).on("click", ".quantity-circle", function() {
        $(this).parent().children("span").each(function() {
            $(this).removeClass("active-quantity");
            $(this).addClass("inactive-quantity");
        });
        $(this).addClass("active-quantity");
            if ($(this).hasClass("quan1")) {
                // change the price displayed based on selection
                localStorage.quantity = 1;
                document.getElementById("price").innerHTML = "$1.50";
            }
            else if ($(this).hasClass("quan2")) {
                localStorage.quantity = 3;
                document.getElementById("price").innerHTML = "$3.50";
            }
            else if ($(this).hasClass("quan3")) {
                localStorage.quantity = 6;
                document.getElementById("price").innerHTML = "$6.50";
            }
            else if ($(this).hasClass("quan4")) {
                localStorage.quantity = 9;
                document.getElementById("price").innerHTML = "$9.00";
            }
            else if ($(this).hasClass("quan5")) {
                localStorage.quantity = 12;
                document.getElementById("price").innerHTML = "$11.00";
            }
    });

    // Dropdown menu
    $('.glaze').click(function () {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active-glaze');
        $(this).find('.dropdown-menu').slideToggle(300);
    });
    $('.glaze').focusout(function () {
        $(this).removeClass('active-glaze');
        $(this).find('.dropdown-menu').slideUp(300);
    });
    $('.glaze .dropdown-menu li').click(function () {
        $(this).parents('.glaze').find('span').text($(this).text());
        $(this).parents('.glaze').find('input').attr('value', $(this).attr('id'));
    });


    $('#add_cart').click(function() {

            //based on quantity of buns user clicks, set quantity & image in localStorage
            $(".quantities").children("span").each(function() {
            if ($(this).hasClass("active-quantity")) {
                if ($(this).hasClass("quan1")) {
                    localStorage.quantity = 1;
                    localStorage.image = "image/cart/blueberryPic.png";
                } 
                else if ($(this).hasClass("quan2")) {
                    localStorage.quantity = 3;
                    localStorage.image = "image/cart/blueberryPic.png";
                }
                else if ($(this).hasClass("quan3")) {
                    localStorage.quantity = 6;
                    localStorage.image = "image/cart/blueberryPic.png";
                }
                else if ($(this).hasClass("quan4")) {
                    localStorage.quantity = 9;
                    localStorage.image = "image/cart/blueberryPic.png";
                }
                else if ($(this).hasClass("quan5")) {
                    localStorage.quantity = 12;
                    localStorage.image = "image/cart/blueberryPic.png";
                }
            }
        });
          

        //set name, price, and glaze for item in localStorage 
        localStorage.name = $("#text1").text();
        localStorage.price = $("#price").text();
        localStorage.glaze = $('input').attr("value");

        //create cartItem, and add to cart 
        var newCartItem = new cartItem(localStorage.image, localStorage.quantity, localStorage.price, 
            localStorage.glaze, localStorage.name);
        cart.push(newCartItem);      

        //add to number of items in the cart
        if (localStorage.cartAdds) {
            localStorage.cartAdds = Number(localStorage.cartAdds) + 1;
        }          
        else {
            localStorage.cartAdds = 1;
        }

        //add items in the cart to localStorage
        localStorage.setItem("cartItems", JSON.stringify(cart));

    });
});


//list cartItems in cart
function cartLoad() {
    //get items from cart
    var items = JSON.parse(localStorage.getItem("cartItems"));

    console.log(items)

    $("#cart_count").text(localStorage.cartAdds);

    //loop through items in cart 
    for (var i = 0; i < items.length; i++) {

        //create element per item in cart
        var itemCard = document.createElement('div');
        itemCard.className = "item";
        itemCard.id = "itemId"+i;
        $(".shopping-cart").append(itemCard);

        var del = document.createElement('img');
        del.className = "delete-btn";
        del.id = "del"+i;
        del.src = "image/cart/delete-icn.svg";
        $("#itemId"+i).append(del);

        var imageBun = document.createElement('img');
        imageBun.className = "imageBun";
        imageBun.id = "imageBun"+i;
        imageBun.src = items[i].image;
        $("#itemId"+i).append(imageBun);



        var description = document.createElement('div');
        description.className = "description";
        description.id = "description"+i;
        $("#itemId"+i).append(description);

        var name = document.createElement('span');
        name.className = "description";
        name.id = "name"+i;
        name.innerHTML = items[i].name;
        console.log(items[i])
        $("#description"+i).append(name);

        var glaze = document.createElement('span');
        glaze.className = "description";
        glaze.id = "glaze"+i;
        glaze.innerHTML = items[i].glaze;
        $("#description"+i).append(glaze);



        var quantityPicker = document.createElement('div');
        quantityPicker.className = "quantityPicker";
        quantityPicker.id = "quantityPicker"+i;
        $("#itemId"+i).append(quantityPicker);

        var minus = document.createElement('img');
        minus.className = "quantityPicker";
        minus.id = "minus"+i;
        minus.src = "image/cart/minus.svg";
        $("#quantityPicker"+i).append(minus);

        var quantity = document.createElement('span');
        quantity.className = "quantityPicker";
        quantity.id = "quantity"+i;
        quantity.innerHTML = items[i].quantity;
        $("#quantityPicker"+i).append(quantity);

        var plus = document.createElement('img');
        plus.className = "quantityPicker";
        plus.id = "plus"+i;
        plus.src = "image/cart/plus.svg";
        $("#quantityPicker"+i).append(plus);


        var price = document.createElement('div');
        price.className = "total-price";
        price.id = "price"+i;
        price.innerHTML = items[i].price;
        $("#itemId"+i).append(price);

    }
}


//update number of items in cart
function cartCount() {
    $("#cart_count").text(localStorage.cartAdds);
}


//remove item when x clicked
$(document).on("click", ".delete-btn", function() {

    //remove instance of object from array
    $(this).parent().remove();

    var num = $(this).attr("id").slice(6);
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    localStorage.setItem("cartItems", JSON.stringify(cartItems.splice(num, 1)));

    //change num displayed
    localStorage.cartAdds = Number(localStorage.cartAdds) - 1;
    $("#cart_count").text(localStorage.cartAdds);
});



