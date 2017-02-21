$(function(){
    pagination.page();

})

var pagination = {
    page:function(){
        //鼠标点击，相对应的页数变样式
        $("#J_bottomPage>.p-num>.p-cont").on("click",function(){
            $(this).addClass("curr").siblings().removeClass("curr");
//            console.log($(this).html());
            //如果当前页数为第1页，则上一页点击无效
            if($(this).html()!=1){
                $(".p-num>.pn-prev").removeClass("disabled");
            }else{
                $(".p-num>.pn-prev").addClass("disabled");
            }

        });

    }
}


