var cartJson = localStorage.cart;
$(".ShoppingCart").on("mouseenter",function(){
    // $("cart_empty").show();

    // console.log(getCart())
   $(".cart_empty").html(renderCart());

});
function renderCart(){
    var html = `<div id="clear">清空</div>`;
    var oMsg = JSON.parse(cartJson);
    console.log(oMsg);
    var num = 0 ;
    var data = oMsg;

    for(var i = 0 ; i < data.length ; i ++){
        html += `<dt class="clearfix"><img src="${data[i].productImage}"> <span>单价：￥${data[i].productPrice}</span> <span>${data[i].count}</span></dt>`
        num +=   data[i].count;
    }

    $(".glyphicon ").html(num);
    return html;
}

renderCart()