$(function(){
//    调用nav对象里的dorpShow方法：鼠标移动上去显示对应的下面盒子，下面的盒子为下拉可扩展的内容
    nav.dorpShow();
//    调用nav对象里的flLayout方法：送货，登录注册样式在做左或右可变，用方法里面的参数来控制，
//    没有参数则默认送货在左，登录在右，如果有参数为字符串ttbar-login，则没有送货地址，登录注册在左
    nav.flLayout("ttbar-login");
//      调用nav对象里的foreNum方法：可以传参，传入几就是生成几个
//     nav.foreNum(5);
})
var nav = {
//    鼠标移动上去显示对应的下面盒子，下面的盒子为下拉可扩展的内容
    dorpShow:function(){
        $("#shortcut-2014 .dorpdown").each(function(){
            $(this).on("mouseover",function(){
               $(this).children(".dorpdown-layer").show();
            });
            $(this).on("mouseleave",function(){
                $(this).children(".dorpdown-layer").hide();
            });
        })
    },
//    需求：送货，登录注册样式可变，如果没有送货，则登录注册在右
//    方法；控制方法里面的参数，没有参数则当前默认为左侧为选择送货地址，登录注册
//         在右，如果登录注册想在左，则传参数为字符串ttbar-login即可
    flLayout:function(dom){
//        console.log(dom)
        var str = '';
        str += '<li class="fore1" id="'+dom+'">';
        str += '<a href="javascript:void(0)" class="link-login style-red">请登录</a>&nbsp;&nbsp;';
        str += '<a href="javascript:void(0)" class="link-regist">免费注册</a>';
        str += '</li>'
//       定义一个变量为参数的长度
        var leth = arguments.length;
        if(leth==0){
//            参数为零默认样式左侧为送货至，右侧为登录注册
//            把登录注册添加到右侧
           $("#shortcut-2014>.w>.fr").prepend(str);
        }else{
//            参数不为零，则没有送货至，登录注册放在左面
//            清空删除左侧的送货元素
            $("#shortcut-2014>.w>.fl").children().remove();
//            把登录注册添加到左侧
            $("#shortcut-2014>.w>.fl").prepend(str);
        }

    }

}

