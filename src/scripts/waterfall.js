// 瀑布流

function Waterfall(){}
$.extend(Waterfall.prototype,{
    init(){
        this.main = $(".lists");
        this.nowPage= 0;
        this.loading = false;;
        this.loadJson()
        .then(function(res){
           
            this.json = res.subjects;
            // console.log(this.json);
           var json = this.json;
            this.renderPage();
            return json;
        })
        this.bindEvent();
    },
    loadJson(){
        var opt = {
            
            url:`http://localhost:85/api/hua/watch/data?count=150&start=0`,
            type:"GET",
            context : this
        }
        return $.ajax(opt);
    },
    renderPage(){
        // console.log(1);
        var list =  this.json;
        var html = "";
        for(var i  = 25*this.nowPage; i <=20*this.nowPage+19 ; i ++){
            html += `<li>
                        <a href="javascript:void(0)">
                            <img pic-id=${list[i]._id} src="${list[i].productImage}" alt="">    

                            <span>￥${list[i].productPrice}</span>
                            <p>${list[i].productName}</p>
                        </a>                                
                       
                        <div class="goods_btns" data-id=${list[i]._id}>   加入购物车</div>
                    </li>`
           
        }
        this.main.html(this.main.html() + html);
        // console.log( html)
        this.loading = false;  
    },
    bindEvent(){
        $(window).on("scroll",this.ifLoad.bind(this));
        
    },
    ifLoad(){
        if(this.loaded == false){
            return 0;
         }
         var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
         var showHeight = document.documentElement.clientHeight + scrollTop;
         var aLi = $(".lists li");
         var lastLi =aLi[aLi.length -1];
        //  console.log(lastLi.offsetTop);
        //  console.log(scrollTop);
         if( lastLi.offsetTop <= showHeight ){
            this.loading = true;
            this.nowPage ++;
            // console.log(this.nowPage);
            if(this.nowPage > 6){
                return 0;

            }
           
                this.renderPage()
           
            
            

        }
    }
})

var waterfall = new Waterfall();
waterfall.init();