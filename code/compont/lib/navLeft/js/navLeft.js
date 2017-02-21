
$(function(){
	var commonJs = {
		// bool是true 是 可收缩的   false是不可收缩的
		all_commodity:function(con,bool){
			var con = $(con);
			var down = $(con).find('.dropdown');
			var category_item = $(con).find('.categoryList-inner');
			var items_ub = $(con).find('.item-sub');
	        category_item.mouseenter(function(){
	            $(this).find(items_ub).css("display","block");
	        })

	        category_item.mouseleave(function(){
	            $(this).find(items_ub).css("display","none");
	        })
	        if(bool){
	        	down.hide();
	        	con.mouseenter(function(){
	                down.stop().slideDown();
		        }).mouseleave(function(){
		            down.stop().slideUp();
		        })
	        }	       
	    },
	    //表单的列数控制
	    list_count:function(num){
	    	var _this = this;
	    	for(var i=0;i<num;i++){
	    		$('<li class="categoryList-inner">'+
                '<a href="javascript:;" class="item">'+
                     '电子商城'+
                    '<i class="c_itemline"></i>'+
                    '<span class="arrow"></span>'+
                '</a>'+
                '<div class="item-sub clearfix" id="">'+
                    '<div class="sub-channel">'+

                        '<a href="javascript:;" class="c_name">'+
                            '电子商城'+
                            '<i class="c_line"></i>'+
                        '</a>'+
                    '</div>'+
                    '<div class="sub-lists clearfix">'+
                        '<dl class="list1 clearfix">'+
                         '<!--<dt><a href="javascript:;">全部手机</a></dt>-->'+
                            '<dd>'+
                                '<a href="./goods_search.html">4G手机</a>'+
                                '<a href="./goods_search.html">对讲机</a>'+
                                '<a href="./goods_search.html">老人机</a>'+
                                '<a href="./goods_search.html">老人机</a>'+
                                '<a href="./goods_search.html">儿童机</a>'+
                                '<a href="./goods_search.html">老人机</a>'+
                                '<a href="./goods_search.html">儿童机</a>'+
                                '<a href="./goods_search.html">儿童机</a>'+
                            '</dd>'+
                        '</dl>'+
                    '</div>'+
                '</div>'+
            '</li>').appendTo($('.categoryList'));
	    	}
	    	  //展现形式
			 _this.all_commodity('.all-category',false); 
	   
	    }
	  
	};
	 
	
	//列表个数的调用
	commonJs.list_count(9);	
})
	
	
	 
