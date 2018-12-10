function Banner(){}
$.extend(Banner.prototype,{
    init(){
        this.index = 0 ;
        this.prve_index = 0 ;
        // 选中背景图
        this.$slides = $(".slide")

        // console.log(this.$slides)
        this.$pagewarp = $(".pagination")
        this.maxIndex = this.$slides.length - 1;
        this.initPagination()
        this.bindEvent()
        this.autoPlay()
    },
    bindEvent(){
        $(".btn_right").on("click" , this.next.bind(this));
        $(".btn_left").on("click" , this.prve.bind(this));

        this.$pagewarp.on("mouseover","span",this.toIndex.bind(this))

        $(".banner").hover(this.stopAutoPlay.bind(this),this.autoPlay.bind(this))
    },
    next(){
        this.prev_index = this.index ;   // 此时 
        if(this.index == this.maxIndex){
            this.index = 0 ;
        }else{
            this.index ++ ; 
        }
        this.changeClass();  
        // console.log(this.index)
        // console.log(this.$slides.eq(this.index))
    },
    prve(){
        this.prev_index = this.index ;   // 此时 
        if(this.index == 0){
            this.index = this.maxIndex ;
        }else{
            this.index -- ; 
        }
        this.changeClass();  
    },
    changeClass(){
        this.$slides.eq(this.prve_index).addClass("slide-willhide")
        .siblings(".slide").removeClass("slide-willhide")
        this.$slides.eq(this.index).addClass("slide-show")
        .siblings(".slide").removeClass("slide-show")
        .end().hide().stop().fadeIn();
        this.$pagewarp.children().eq(this.index).addClass('active')
        .siblings("span").removeClass("active");
        this.$pagewarp.children().eq(this.index).addClass("active")
        .siblings("span").removeClass("active");
    },
    initPagination(){
        for(var i = 0 ; i < this.$slides.length ; i ++){
            this.$span = $("<span>");
            console.log(i)
            if(i == this.index){
                this.$span.addClass("active")
                // console.log(this.$span)
            }
            this.$pagewarp.append(this.$span)
        }
        
    },
    toIndex(event){
        var e = event || window.event;
        var target = e.target || e.srcElement;

        this.prve_index = this.index;
        this.index = this.$pagewarp.children().index(target);

        this.changeClass()
    },
    autoPlay(){

        this.timer = setInterval('$(".btn_right").trigger("click")',3000)
    },
    stopAutoPlay(){
        clearInterval(this.timer);
    }
})

export default new Banner();