function GoTop(){
    $(".ico_top").on("click",function(){
        $("html,body").scrollTop(0);
    })
}
export default new GoTop(); 