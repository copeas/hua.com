function Login(){
    var oUser = $("#login_username");
    var oPwd = $("#login_password");

    $("#login_button").click(function(){
        $.ajax({
            type:'POST',
            url: "http://localhost:85/api/huausr/hualogin",
            data:`username=${oUser.val()}&password=${oPwd.val()}`
        })
        .then(function(res){
            // console.log(res);
           if(res){
            location.href="index.html";

            var prevLink = document.referrer;
            if($.trim(prevLink)==''){
                location.href = 'index.html';
            }else{
                if(prevLink.indexOf('list.html')!==-1){	//来自其它站点
                    location.href = 'list.html';
                }
                if(prevLink.indexOf('register.html')!=-1){		//来自注册页面
                    location.href = 'index.html';
                } 
                if(prevLink.indexOf('detail.html') !==-1){	//来自其它站点
                    location.href = 'detail.html';
                }

            }
           }
        })
    })
}

Login();