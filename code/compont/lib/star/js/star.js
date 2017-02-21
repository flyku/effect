/**
 * 
 */
//星星评分
$(function(){
    var stepW = 15;
    var stars = $("#star > li");
    $("#showb").css("width", "0px");
    stars.each(function (i) {
        $(stars[i]).click(function (e) {
            var n = i + 1;
            $("#showb").css({"width": stepW * n});
            $(this).find('a').blur();
            return stopDefault(e);
        });
    });
    function stopDefault(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        } else {
            window.event.returnValue = false;
            return false;
        }
    }
});