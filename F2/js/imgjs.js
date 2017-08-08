var startX, stopX;
var index = 1;
var pre = 0;
var len=$('.img-photo').length;;
$(document).ready(function() {
    var currentIndex = 0,
    interval,
    hasStarted = false,
    t = 3000;
    $('.img-photo:not(:first)').hide();
    $('.imgPage:first').addClass('on');
    $('.img-turn').hide();
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
    currentIndex = $(this).index();
    play(preIndex, currentIndex);
    }, function() {
    start();
    });
    $('.img-pre').unbind('click');
    $('.img-pre').bind('click', function() {
    pre();
    });
    $('.img-next').unbind('click');
    $('.img-next').bind('click', function() {
    next();
    });
    function pre() {
    var preIndex = currentIndex;
    currentIndex = (--currentIndex + len) % len;
    play(preIndex, currentIndex);
    }
    function next() {
    var preIndex = currentIndex;
    currentIndex = ++currentIndex % len;
    play(preIndex, currentIndex);
    }
    function play(preIndex, currentIndex) {
    $('.img-photo').eq(preIndex).fadeOut(500)
    .parent().children().eq(currentIndex).fadeIn(1000);
    $('.imgPage').removeClass('on');
    $('.imgPage').eq(currentIndex).addClass('on');
    }
    function start() {
        if(!hasStarted) {
            hasStarted = true;
            interval = setInterval(next, t);
        }
    }
    function stop() {
        clearInterval(interval);
        hasStarted = false;
    }
    start();
    });
$(".img").on("mousedown", function(event) {
  event.preventDefault();
  startX = event.pageX;
});

$(".img").on("mouseup", function(event) {
  event.preventDefault();
  stopX = event.pageX;
  eventEnd();
});

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
  } else if (startX - stopX < -20) {
    $(".img-pre").click();
  }
}
