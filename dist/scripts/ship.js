$(".lists").on("click","img",handleskip);

function handleskip(){
    var e = event || window.event;
    var target = e.target || e.srcElement;

    var iid = $(target).attr("pic-id");
    var nowMsg = findJson(iid)[0];
    // console.log(nowMsg);
    skip(nowMsg);
}
function skip(nowMsg){
    var sNowMsg = JSON.stringify(nowMsg);
    localStorage.setItem("img", `[${sNowMsg}]`);
    // console.log(localStorage.img);
    location.href = "detial.html";
    
}
function findJson(iid){
    // console.log(waterfall.json)
    return  waterfall.json.filter(function(item){
          return  item._id === iid
    })
}