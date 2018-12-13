function Register(){
    var oUser = $("#register_username");
    console.log(oUser);
    var oPwd = $("#register_password");
    var oRpwd = $("#twice_password");
    console.log( $("#register_button"));
    var reg = /^[0-9a-z][0-9a-z_]{5,19}@[0-9a-z]{2,6}\.[a-z]{2,5}$/
    $("#register_button").on("click",function(){
       
        var user = oUser.val();
        if( user == ""){
            alert("邮箱不能为空");
            return 0 ;
        }
        if(!reg.test(user)){
            alert("邮箱格式不正确");
            return 0;
        }
        // 密码
        var psd = oPwd.val();
        var rpsd = oRpwd.val();
        if(psd == ""){
            alert("密码不能为空");
            return 0 ;
        }

        if( rpsd == ""){
            alert("密码不能为空");
            return 0 ;
        }
        if(psd != rpsd){
            alert("两次密码不一致");
            return 0 ;
        }
        $.ajax({
            type:"POST",
            url:"http://localhost:85/api/huausr/huaregister",
            data:`username=${user}&password=${psd}`
        })
        .then(function(res){
            console.log(res);
            console.log(res.statu)
           if(res.statuCode === 1){
            location.href="login.html";
            
           }
        })
    })
}

Register();
