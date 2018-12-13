// function Render(){};

// $.extend(Render.prototype,{
//     init(){

//     }
// })

var Json = localStorage.img;

function render(){
    var aMsg = JSON.parse(Json);
   
    console.log(aMsg[0]);
  
    var data = aMsg[0];
    $(".small_pic img").attr("src" , data.productImage);

    $(".frame").css({
        backgroundImage:`url(${data.productImage})`
    });

    $(".big img").attr("src",data.productImage);
    var html = `
         
                <span>价格：￥${data.productPrice}</span>
                <p>${data.productName}</p>

                <li>
                    加入购物车
                </li>
           
    `;
    
    $(".title").html(html);

    
}
render();

