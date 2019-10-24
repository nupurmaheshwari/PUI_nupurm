var cartAdds = 0;

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
            document.getElementById("price").innerHTML = "$1.50";
        }
        else if ($(this).hasClass("quan2")) {
            document.getElementById("price").innerHTML = "$3.50";
        }
        else if ($(this).hasClass("quan3")) {
            document.getElementById("price").innerHTML = "$6.50";
        }
        else if ($(this).hasClass("quan4")) {
            document.getElementById("price").innerHTML = "$9.00";
        }
        else if ($(this).hasClass("quan5")) {
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


    $("#add_cart").click(function() {
        //add number to counter every time "add to cart" is clicked
        if (localStorage.cartAdds) {
            localStorage.cartAdds = Number(localStorage.cartAdds) + 1;
        }          
        else {
            localStorage.cartAdds = 1;
        }
    });
});


function cartCount() {
    //display number of items in cart
    $("#cart_count").text(localStorage.cartAdds);
}



