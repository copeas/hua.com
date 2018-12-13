

// 购物车;

$(".lists").on("click" , ".goods_btns",handleCarClick);

function handleCarClick(event){
    var e = event || window.event;
    // var target = e.currentTarget;
    var target = e.target || e.srcElement;
    // console.log($(target).children(".goods_btns"))
    // console.log(target)
    var iid = $(target).attr("data-id");
    // console.log(iid)
    var nowMsg = findJson(iid)[0];
    console.log(nowMsg)
    addCar(nowMsg,iid);
    renderCart()
}


function addCar(nowMsg , iid){
    $.extend(nowMsg , {count : 1});
    var sNowMsg = JSON.stringify(nowMsg);
     // console.log(sNowMsg);
    if(!localStorage.cart){
        localStorage.setItem("cart",`[${sNowMsg}]`);
        return false;
    }

    var aMsg = JSON.parse(localStorage.cart);
    if(!hasId(aMsg,iid)){
        aMsg.push(nowMsg);
    }
    localStorage.setItem("cart",JSON.stringify(aMsg));

    console.log(JSON.parse(localStorage.cart));

}
function hasId(aMsg , iid){
    for(var i = 0 ; i < aMsg.length ; i ++){
        if(aMsg[i]._id === iid){
              aMsg[i].count ++;
              return true;
        }
    }
    return false;
}
function findJson(iid){
    // console.log(waterfall.json)
    return  waterfall.json.filter(function(item){
          return  item._id === iid
    })
}

$(".ShoppingCart").on("mouseenter",function(){
    // $("cart_empty").show();

    // console.log(getCart())
   $(".cart_empty").html(renderCart());

});

function getCart(){
    if(!localStorage.cart) return 0;
    var aMsg = JSON.parse(localStorage.cart);
    return aMsg;
}

function renderCart(){
    var html = `<div id="clear">清空</div>`;
    var cart_json = getCart();
    // console.log(cart_json)
    if(!cart_json) return 0;
    num = 0;
    for(var i = 0 ; i < cart_json.length ; i ++){
          html += `<dt class="clearfix"><img src="${cart_json[i].productImage}"> <span>单价：￥${cart_json[i].productPrice}</span> <span>${cart_json[i].count}</span></dt>`
          num +=   cart_json[i].count;
    }
    $(".glyphicon ").html(num);
    return html;
}
renderCart();
$(".cart_empty").on("click","#clear",function(){
    console.log($("#clear"));
    localStorage.clear("cart");
    // var sha = "<p>您的购物车中没有商品，先去选购吧！</p>"
    // $(".cart_empty").html(sha);
    // $(".glyphicon ").html(0);
    // renderCart();
    location.href = "list.html";
})
