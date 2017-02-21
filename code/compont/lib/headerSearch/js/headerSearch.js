$(function(){

//  调用searchJs对象里的searchShowTip方法：
    searchJs.searchShowTip();
//  调用searchJs对象里的cartShowTip方法：
    searchJs.cartShowTip();
})
var searchJs = {
//    需求： 1、在搜索框内输入字时，下面有相关的搜索列表显示
//           2、列表展示后鼠标悬浮到列表，相对应的li列表改变背景颜色
//           3、点击相关列表里的“关闭”二字，则相关的搜索列表隐藏
    searchShowTip:function () {
        var text = $("#search-2014 .form .text"); //获得输入文本框
        var shelper = $("#search-2014>#shelper"); //获得下面有相关的搜索
        var itemLis = shelper.children("li");  //获得列表里的所有li元素
        var close = $("#search-2014>#shelper>.close") //获得列表里的“关闭”二字
        text.on("input propertychange",function () {
            var value = text.val();
            //需求1
            shelper.stop(true, true).slideDown();
            //需求2
            itemLis.each(function () {
                $(this).on("mouseenter",function () {
                    //关闭按钮不用变颜色，所以定义变量检查是否有鞍鼻按钮的类名
                    var flase = $(this).hasClass("close");
                    if(!flase){
                        $(this)
                            .css("background-color","rgb(255, 223, 198)")
                            .siblings()
                            .css("background-color","#ffffff")
                    }
                })
            });
            //需求3
            close.on("click",function () {
                shelper.hide();
            })

        })

},
    // 需求：1、鼠标悬浮在购物车时，判断购物车是否有商品，则显示相应的效果
          // 2、鼠标离开  购物车的下拉显示内容隐藏
    cartShowTip:function () {
        var myCart = $("#myCart"); //获得购物车元素
        var dorpdownLayer = $("#myCart .dorpdown-layer");//隐藏的内容
        var spacer = $("#myCart .spacer");
        var prompt = $("#myCart .prompt");//没有商品内容
        var settleupContent = $("#myCart #settleup-content");//有商品内容
        // 需求1
        myCart.on("mouseenter",function () {
            var shoppingAmount = $("#shopping-amount").text();//获得购物车里的商品数
            if(shoppingAmount==0){
                dorpdownLayer.show().children("#settleup-content").remove();
              
            }else {
                dorpdownLayer.show().children(".prompt").remove();
              
            }
        })
        // 需求2
        myCart.on("mouseleave",function(){
            dorpdownLayer.hide();
        })

    }

}