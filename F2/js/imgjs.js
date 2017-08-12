
$(document).ready(function() {
    var nowIndex = 0,
    interval,startX,stopX,
    isStarted = false,
    t = 3000,
    len=$('.img-photo').length;
    function init(){
        $('.img-photo:not(:first)').hide();
        $('.imgPage:first').addClass('on');
        $('.img-turn').hide();
    }
    $('.img-photo, .img-pre, .img-next').hover(function() {
        stop();
        $('.img-turn').slideUp('500');
    }, function() {
    	$('.img-turn').slideDown('500');
        start();
    });
    $('.imgPage').hover(function(e) {
        stop();
        var preIndex = $(".imgPage").filter(".on").index();
        nowIndex = $(this).index();
        play(preIndex, nowIndex);
    }, function() {
        start();
    });

    function imgPre(){
    $('.img-pre').unbind('click');
    $('.img-pre').bind('click', function() {
        pre();
    }
    function imgNext(){
    $('.img-next').unbind('click');
    $('.img-next').bind('click', function() {
        next();
    }
    function pre() {
    var preIndex = nowIndex;
    nowIndex = (--nowIndex + len) % len;
    play(preIndex, nowIndex);
    }
    function next() {
    var preIndex = nowIndex;
    nowIndex = ++nowIndex % len;
    play(preIndex, nowIndex);
    }
    function play(preIndex, nowIndex) {
        $('.img-photo').eq(preIndex).fadeOut(500).parent().children().eq(nowIndex).fadeIn(1000);
        $('.imgPage').removeClass('on');
        $('.imgPage').eq(nowIndex).addClass('on');
    }
    function start() {
        if(!isStarted) {
            isStarted = true;
            interval = setInterval(next, t);
        }
    }
    function stop() {
        clearInterval(interval);
        isStarted = false;
    }
    start();
    function toutch(){
        $(".img").on("touchstart", function(event) {
            event.preventDefault();
            startX = event.originalEvent.changedTouches[0].clientX;
        });

        $(".img").on("touchend", function(event) {
            event.preventDefault();
            stopX = event.originalEvent.changedTouches[0].clientX;
            eventEnd();
        });
        function eventEnd() {
            if (startX - stopX > 20) {
                $(".img-next").click();
            }
            else if (startX - stopX < -20) {
                $(".img-pre").click();
            }
        }
    }
});


