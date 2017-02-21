/**
 * Created by Pactera on 2016/5/30.
 */
//个人中心页面的我的购物车功能实现
$(function(){
    var personalCenterCart={

        //当商品列表中的商品个数为0的时候,显示购物车为空页面
        hideNoGoodsPage:function(){
            var noGoodArea=$(".no-goods");//获取购物车为空页面
            var gTotal=$(".g_n");//获取我的购物车顶部商品总数
            var mcart=$(".mcart")//我的购物车主体部分
            if(gTotal.html()==0){//如果购物车中没有商品，则显示购物车为空页面
                noGoodArea.show();
                mcart.hide();
            }else{
                noGoodArea.hide();
                mcart.show();
            }
        },
        //顶部商品总数功能
        allGoods:function (){
            var goodsBox=$("#all_goods"); //商品大盒子
            var lis = goodsBox.find(".g_lists_li");//商品行
            var gTotal=$(".g_n");//顶部商品总数
            gTotal.html(lis.length);
            personalCenterCart.hideNoGoodsPage();
        },

        // 更新底部总件数和总价格
        getTotal:function () {

            var lis = $(".g_lists_li");//商品行
            var selectedTotal=$(".selectedTotal");//已选商品数目容器
            var priceTotal = $('.priceTotal'); //总计
            var seleted = 0;//初始化被选择的商品总数为0;
            var prices = 0;//初始化商品总积分为0;
            //计算
            lis.each(function(){
                var piece = $(this).find('.num_list').children(".num_input").val(),

                    price = $(this).find('.total_list').html();

                if($(this).find('input:checkbox').is(':checked')){
                    $(this).css("background-color","#F7F7F7");
                    seleted += parseInt(piece);
                    prices += parseInt(price);
                }else{
                    $(this).css("background-color","#fff");
                }
            })
            selectedTotal.html(seleted);
            priceTotal.html(prices);

        },

        //给每行的选择框绑定事件
        preCheckboxEvents:function (){
            //获取每一行的商品前面的复选框
            var checkboxes=$('#all_goods').find(".g_lists_li").children("input");
            checkboxes.each(function(){
                $(this).on("click",function(){
                    personalCenterCart.getTotal();//点击复选框之后计算总数和总积分
                })
            })
        },

        // 计算单行价格
        getSubtotal:function() {
            var lis = $(".g_lists_li");//商品行
            lis.each(function(){
                var price = $(this).find(".price_list").html(); //单价
                var subtotal =$(this).find(".total_list"); //实付积分
                var countInput =$(this).find(".num_list").children("input").val(); //数目input
                var subtract = $(this).find(".num_list").children(".subtract"); //-号
                //写入HTML
                subtotal.html((parseInt(countInput) * parseInt(price)));
                //如果数目只有一个，把-号的颜色变成灰色
                if (countInput == 1) {
                    subtract.css("color","#ccc");//输入框中的值等于1的时候，默认减号为#ccc
                    subtract.hover(function(){
                        $(this).css({"color":"#ccc","border-color":"#E8E8E8"});
                    },function(){
                        $(this).css({"color":"#ccc","border-color":"#E8E8E8"});
                    })
                }else{
                    subtract.css("color","#333333");
                    subtract.hover(function(){
                        $(this).css({"color":"#FF2D4B","border-color":" #FF2D4B"});
                    },function(){
                        $(this).css({"color":"#333333","border-color":"#E8E8E8"});
                    })
                }
            })
            personalCenterCart.getTotal();//点击复选框之后计算总数和总积分
    },

        //给全选checkbox绑定单击事件：处理所有选项的checkbox选中状态
        checkAllInput:function (){
            var checkAllInput=$(".check-all");// 全选框
            var selectedTotal=$(".selectedTotal");//已选商品数目容器
            var priceTotal = $('.priceTotal'); //总计
            checkAllInput.on("click",function(){
                // 全选
                if ($(this).is(':checked')) {
                    // 设置复选框被选中
                    $('.g_lists_li').find('input:checkbox').prop('checked',true);
                    $('.g_lists_li').css("background-color","#F7F7F7");
                }else{
                    $('.g_lists_li').find('input:checkbox').prop('checked',false);
                    $('.g_lists_li').css("background-color","#fff");
                }
                personalCenterCart.getTotal();//点击复选框之后计算总数和总积分
            })
        },

        //如果每个商品行li中的checkbox被选中，那么全选按钮则被选中
        AllInputIsChecked:function (){
            var selectInputs=$(".check"); //所有勾选框
            var checkAllInput=$(".check-all");// 全选框
            // 给所有checkbox元素 绑定click事件
            selectInputs.on("click",function(){
                // 重新获取里面的被选中的checkbox
                $cbs=$('#all_goods').find(".g_lists_li").children("input");
                // 获取所有被选中的checkbox个数
                $('#all_goods').find(":checkbox:checked").length === $cbs.length ?
                    checkAllInput.prop("checked", true) :
                    checkAllInput.prop("checked", false);
            })

    },

        //点击加号和减号按钮实现数量的增加和减少
        addAndSubEvents:function (){
            var lis = $(".g_lists_li");//商品行
            lis.each(function(){
                var subtract = $(this).find(".num_list").children(".subtract"); //-号
                var add = $(this).find(".num_list").children(".add"); //+号
                //加的效果
                add.on("click",function(){
                    var that=$(this);
                    var n=that.prev().val();
                    var num=parseInt(n)+1;
                    if(num==0){ return;}
                    that.prev().val(num);
                    personalCenterCart.getSubtotal();//点击加号按钮之后，计算每行的总积分
                });

                //减的效果
                subtract.on("click",function(){
                    var that=$(this);
                    var n= that.next().val();
                    var num=parseInt(n)-1;
                    if(num==0){ return}
                    that.next().val(num);
                    personalCenterCart.getSubtotal();//点击减号按钮之后，计算每行的总积分

                });
            })
            personalCenterCart.getTotal();//最后再计算底部的总的被选择的商品数量和总积分；
    },

        //为数量输入框注册keyup事件
        inputKeyup:function (){
            var lis = $(".g_lists_li");//商品行
            lis.each(function(){//遍历每一个商品行
                var countInput =$(this).find(".num_list").children("input"); //数目input
                var subtract = $(this).find(".num_list").children(".subtract"); //-号

                countInput.each(function(){//遍历每一个数目input
                    var that=$(this);
                    that.on("keyup",function(){
                        var value=parseInt(that.val());//input中的值
                        if(isNaN(value)||value<1){
                            value=1;
                        }
                        that.val(value);
                        personalCenterCart.getSubtotal();//当输入框中的值改变的时候，从新计算单行积分总数
                        personalCenterCart.getTotal();//当输入框中的值改变的时候，从新计算底部积分总数和商品总数
                    });

                });

            });
        },

        //全部删除功能
        deleteAll:function (){
            var del=$(".canc");//获取全部删除按钮
            var lis = $(".g_lists_li");//商品行
            var selectedTotal=$(".selectedTotal");//已选商品数目容器
            var checkAllInput=$(".check-all");// 全选框
            var promoteDialog=$(".promote-dialog");//用户没有选择商品直接点击删除按钮弹出提示框
            var cartDialog=$(".cart-dialog");//批量删除商品弹出框
            var ksDialogMask=$(".ks-dialog-mask");//遮罩层
            var subBtn1=$(".sub-btn1");//确定按钮
            var canBtn1=$(".can-btn1");//取消按钮
            var cClose=$("#c_close");//删除弹出框关闭按钮
            var dClose=$("#d_close");//提示弹出框关闭按钮
            var noGoods=$(".no-goods")//购物车为空时的页面
            del.on("click",function(){
                if(selectedTotal.html()!=0){//如果底部被选中商品的总数不为0时
                    cartDialog.show();
                    ksDialogMask.show();
                    subBtn1.on("click",function(){
                        lis.each(function(){
                            if( $(this).find('input:checkbox').is(":checked")){
                                $(this).remove();
                                checkAllInput.prop("checked",false);//让全选框不被选中
                                cartDialog.hide();
                                ksDialogMask.hide();
                                personalCenterCart.getSubtotal();//重新获取每行总价
                                personalCenterCart.getTotal();//重新获取底部总价
                                personalCenterCart.allGoods();//重新获取顶部总商品数量
                            }
                        })
                    })
                    canBtn1.on("click",function(){
                        cartDialog.hide();
                        ksDialogMask.hide();
                    })
                    cClose.on("click",function(){
                        cartDialog.hide();
                        ksDialogMask.hide();
                    })

                }else{
                    promoteDialog.show();//提示弹出框
                    ksDialogMask.show();//遮罩层
                    dClose.on("click",function(){
                        promoteDialog.hide();
                        ksDialogMask.hide();
                    })

                }

                personalCenterCart.getSubtotal();
                personalCenterCart.getTotal();

            });
    },

        //单行删除功能
        deletePreLi:function (){
            var lis = $(".g_lists_li");//商品行
            var cartPreDialog=$(".cart-preDialog");//单行删除商品弹出框
            var ksDialogMask=$(".ks-dialog-mask");//遮罩层
            var subBtn2=$(".p-btns").find(".sub-btn2");//确定按钮
            var canBtn2=$(".p-btns").find(".can-btn2");//取消按钮
            var eClose=$("#e_close");//删除弹出框关闭按钮
            var checkAllInput=$(".check-all");// 全选框
            lis.each(function(){
                var cl=$(this).find(".ns").children(".cl")//找到单行删除按钮
                cl.on("click",function(){
                    cartPreDialog.show();//弹出层展示
                    ksDialogMask.show();//遮罩层展示
                    var that=$(this);
                    subBtn2.on("click",function(){
                        that.parents(".g_lists_li").remove();
                        cartPreDialog.hide();//弹出层隐藏
                        ksDialogMask.hide();//遮罩层隐藏
                        personalCenterCart.getSubtotal();//关闭之后再次计算单行价格
                        personalCenterCart.getTotal();//关闭之后再次计算总价格价格
                        personalCenterCart.allGoods();//重新获取顶部总商品数量

                    })
                    canBtn2.on("click",function(){
                        cartPreDialog.hide();//弹出层隐藏
                        ksDialogMask.hide();//遮罩层隐藏
                    })
                    eClose.on("click",function(){
                        cartPreDialog.hide();//弹出层隐藏
                        ksDialogMask.hide();//遮罩层隐藏
                    })

                })
                if(lis.length==0){

                }
            })
    },

        //全部移入收藏夹功能
        addAllToColl:function (){
            var collect=$(".cllo");//获取底部全部移入收藏夹按钮
            var lis = $(".g_lists_li");//商品行
            var selectedTotal=$(".selectedTotal");//已选商品数目容器
            var promoteDialog=$(".promote-dialog");//用户没有选择商品直接点击全部收藏按钮弹出提示框
            var ksDialogMask=$(".ks-dialog-mask");//遮罩层
            var checkAllInput=$(".check-all");// 全选框
            var moveColl=$(".moveColl-dialog");//提示用户将商品移入收藏夹提示框
            var subBtn3=$(".sub-btn3");//确定按钮
            var canBtn3=$(".can-btn3");//取消按钮
            var fClose=$("#f_close");//删除弹出框关闭按钮
            var dClose=$("#d_close");//提示弹出框关闭按钮
            collect.on("click",function(){
                if(selectedTotal.html()!=0){
                    moveColl.show();
                    ksDialogMask.show();
                    subBtn3.on("click",function(){
                        lis.each(function(){
                            if( $(this).find('input:checkbox').is(":checked")){
                                $(this).remove();
                                checkAllInput.prop("checked",false);//让全选框不被选中
                                moveColl.hide();
                                ksDialogMask.hide();

                                personalCenterCart.getSubtotal();
                                personalCenterCart.getTotal();
                                personalCenterCart.allGoods();//重新获取顶部总商品数量
                            }
                        })
                    })
                    canBtn3.on("click",function(){
                        moveColl.hide();
                        ksDialogMask.hide();
                    })
                    fClose.on("click",function(){
                        moveColl.hide();;
                        ksDialogMask.hide();
                    })

                }else{
                    promoteDialog.show();//提示弹出框
                    ksDialogMask.show();//遮罩层
                    dClose.on("click",function(){
                        promoteDialog.hide();
                        ksDialogMask.hide();
                    })

                }

                personalCenterCart.getSubtotal();
                personalCenterCart.getTotal();

            });
    },

        //单行移入收藏夹功能
        addPreLiToColl:function(){
            var lis = $(".g_lists_li");//商品行
            var preMoveColl=$(".preMoveColl-dialog");//单行移入收藏夹弹出框
            var ksDialogMask=$(".ks-dialog-mask");//遮罩层
            var subBtn4=$(".sub-btn4");//确定按钮
            var canBtn4=$(".can-btn4");//取消按钮
            var preClose=$("#pre_close");//移入购物车弹出框关闭按钮
            var checkAllInput=$(".check-all");// 全选框
            lis.each(function(){
                var mv=$(this).find(".ns").children(".mv")//找到单行移入收藏夹按钮
                mv.on("click",function(){
                    preMoveColl.show();//弹出层展示
                    ksDialogMask.show();//遮罩层展示
                    subBtn4.on("click",function(){
                        mv.parents(".g_lists_li").remove();
                        preMoveColl.hide();//弹出层隐藏
                        ksDialogMask.hide();//遮罩层隐藏
                        personalCenterCart.getSubtotal();//关闭之后再次计算单行价格
                        personalCenterCart.getTotal();//关闭之后再次计算总价格价格
                        personalCenterCart.allGoods();//重新获取顶部总商品数量
                        checkAllInput.prop("checked",false);//让全选框不被选中
                    });
                    canBtn4.on("click",function(){
                        preMoveColl.hide();//弹出层隐藏
                        ksDialogMask.hide();//遮罩层隐藏
                    });
                    preClose.on("click",function(){
                        preMoveColl.hide();;//弹出层隐藏
                        ksDialogMask.hide();//遮罩层隐藏
                    });

                });
            });
         },

        //判断用户积分总数是否足额
        creIsEnough:function (){
            var remainCredits=$(".remain_credits");

        },

    }

    personalCenterCart.allGoods();//顶部商品总数功能
    personalCenterCart.preCheckboxEvents(); //给每行的选择框绑定事件
    personalCenterCart.getSubtotal();// 计算单行价格
    personalCenterCart.checkAllInput(); //给全选checkbox绑定单击事件：处理所有选项的checkbox选中状态
    personalCenterCart.AllInputIsChecked();//如果每个商品行li中的checkbox被选中，那么全选按钮则被选中
    personalCenterCart.addAndSubEvents();//点击加号和减号按钮实现数量的增加和减少
    personalCenterCart.inputKeyup(); //为数量输入框注册keyup事件
    personalCenterCart.deleteAll();//全部删除功能
    personalCenterCart.deletePreLi(); //单行删除功能
    personalCenterCart.addAllToColl();//全部移入收藏夹功能
    personalCenterCart.addPreLiToColl();//单行移入收藏夹功能
    personalCenterCart.creIsEnough(); //判断用户积分总数是否足额

})
