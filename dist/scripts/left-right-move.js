

function GoLeft(){
    $($(".d_bd a")).each(
        function(i){
            $($(".d_bd a")[i]).hover(
                function () {
                  $(this).addClass("active");
                },
                function () {
                  $(this).removeClass("active");
                }
              )
        }
    )
   
}



export default new GoLeft();