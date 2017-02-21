$(function(){
// 调用listBox对象里的focus方法;
	listBox.focus();
});

var listBox = {
	// 需求：鼠标点击关注，关注字体颜色变成白色，边框变成红色，背景图片变成红色
	focus:function(){
		var focuses = $(".p-focus");  //获得列表里的所有“关注”
		 focuses.each(function(){
		    $(this).on('click',function(){
		 		$(this).css("display","block");//显示元素
		 		$(this).children(".J_focus").css("color","#fff"); //字体变成白色
		 		$(this).children(".J_focus").text("已关注");  //文本内容换成“已关注”
		 		$(this).children(".J_focus").append("<i></i>"); //添加i标签
		 		$(this).children(".J_focus").find('i').addClass('active'); // 给i标签添加类名 改变背景图片

		 	});
		});
	}
}
