$(function() {
    $(".container").colorPicker();
});

(function($) {
    $.fn.colorPicker = function() {
        $(function() {
        init(); //初始化画布以及设置监听器
    });
    //初始化变量
    var ribbonY = 0;
    var mapX = 0;
    var mapY = 0;
    var mainColor = "#ff0000";
    var r = 255,
        g = 0,
        b = 0,
        h = 0,    //色调
        s = 1,    //饱和度
        l = 0.5;  //明度

    function init() {
      initRibbon();
      initMap();
      //设置监听器
      $("#ribbon").on("mousedown", ribbonListener);
      $("#colorMap").on("mousedown", mapListener);
      $("#h").on("input porporpertychange", setH);
      $("#s").on("input porporpertychange", setS);
      $("#l").on("input porporpertychange", setL);
      $("#r").on("input porporpertychange", setR);
      $("#g").on("input porporpertychange", setG);
      $("#b").on("input porporpertychange", setB);
      $("#ribbonPoint").draggable({
          axis: "y",
          containment: "parent",
          drag: function(event, ui) {
              ribbonY = ui.position.top;
              h = ribbonY / 300;
              $("#h").val(h.toFixed(2));
              toCSSColor(ribbonY);
              s = 1;
              $("#s").val(1);
              initMap();
              setRGB();
          }
      });

    }
    //初始化色图
    function initMap() {
        mainColor = "#" + format(r.toString(16), 2) + format(g.toString(16), 2) + format(b.toString(16), 2);
        var colorMap = document.getElementById("colorMap");
        var cxt = colorMap.getContext("2d");
        var grd = cxt.createLinearGradient(0, 0, 300, 300);
        //设置由黑到中间色到白色渐变
        grd.addColorStop(0, "#ffffff");
        grd.addColorStop(0.5, mainColor);
        grd.addColorStop(1, "#000000");
        cxt.fillStyle = grd;
        cxt.fillRect(0, 0, 300, 300);
    }
    //用于补齐6位16进制数的位数
    function format(num, len) {
        var l = num.length;
        if (l < len) {
            for (var i = 0; i < len - l; i++) {
                num = "0" + num;
            }
        }
        return num;
    }
    //初始化色带
    function initRibbon() {
        var ribbon = document.getElementById("ribbon");
        var ribbonCont = ribbon.getContext("2d");
        var ribbonLG = ribbonCont.createLinearGradient(0, 0, 25, 300);
        //设置色带渐变色
        ribbonLG.addColorStop(0, "#ff0000");
        ribbonLG.addColorStop(0.167, "#ffff00");
        ribbonLG.addColorStop(0.333, "#00ff00");
        ribbonLG.addColorStop(0.5, "#00ffff");
        ribbonLG.addColorStop(0.667, "#0000ff");
        ribbonLG.addColorStop(0.833, "#ff00ff");
        ribbonLG.addColorStop(1, "#ff0000");
        ribbonCont.fillStyle = ribbonLG;
        ribbonCont.fillRect(0, 0, 25, 300);
    }
    function ribbonListener(event) {
        event.preventDefault();
        ribbonY = event.offsetY; //获取鼠标在色带上的坐标
        h = ribbonY / 300;
        $("#h").val(h.toFixed(2));
        $("#ribbonPoint").css("top", ribbonY - 5);//取选框上边所在颜色
        toCSSColor(ribbonY);
        s = 1;
        $("#s").val(1);
        initMap();
        setRGB();
    }
    //获取鼠标在色图上的坐标，计算出明度
    function mapListener(event) {
        event.preventDefault();
        mapX = event.offsetX;
        mapY = event.offsetY;
        $("#mapPoint").css({
            "left": mapX + 10,
            "top": mapY - 5
        });
        l = 1 - (mapX + mapY - 0.232) / 599.536;
        $("#l").val(l.toFixed(2));
        setRGB();
    }
    //获取输入的h值，改变光标在色带上的位置，并重新设置色图
    function setH() {
        h = Number($("#h").val());
        if (h > 1) {
            h = 1;
            alert("too Big!");
        } else if (h < 0) {
            h = 0;
            alert("too Small!");
        }
        $("#h").val(h);
        $("#ribbonPoint").css("top", h * 300);
        setRGB();
        initMap();
    }
    //获取输入的s值，并重新设置色图
    function setS() {
        s = Number($("#s").val());
        if (s > 1) {
            s = 1;
            alert("too Big!");
        } else if (s < 0) {
            s = 0;
            alert("too Small!");
        }
        $("#s").val(s);
        setRGB();
        initMap();
    }
    //获取输入的l值，重新设置色图光标的位置
    function setL() {
        l = Number($("#l").val());
        if (l > 1) {
            l = 1;
            alert("too Big!");
        } else if (l < 0) {
            l = 0;
            alert("too Small!");
        }
        $("#l").val(l);
        mapX = mapY = (1 - l) * 299.768;
        $("#mapPoint").css({
            "left": mapX + 10,
            "top": mapY - 5
        });
        setRGB();
    }
    //获取输入的r值，重新设置色图，并把对应的hsl输出到对应位置
    function setR() {
        r = Number($("#r").val());
        if (r >= 255) {
            r = 255;
            alert("too Big!");
        } else if (r < 0) {
            r = 0;
            alert("too Small!");
        }
        $("#r").val(r);
        initMap();
        setHSL(r, g, b);
    }
    //获取输入的g值，重新设置色图，改变hsl的值
    function setG() {
        g = Number($("#g").val());
        if (g >= 255) {
            g = 255;
            alert("too Big!");
        } else if (g < 0) {
            g = 0;
            alert("too Small!");
        }
        $("#g").val(g);
        initMap();
        setHSL(r, g, b);
    }
    //获取输入的b值，重新设置色图，改变hsl的值
    function setB() {
      b = Number($("#b").val());
      if (b >= 255) {
        b = 255;
        alert("too Big!");
      } else if (b < 0) {
        b = 0;
        alert("too Small!");
      }
      $("#b").val(b);
      initMap();
      setHSL(r, g, b);
    }
    //根据hsl值计算出对应的rgb值并设置
    function setRGB() {
        var q, p;
        var t = new Array();
        if (s == 0) {
            r = g = b = l;
        } else {
            if (l < 0.5) q = l * (1.0 + s);
            if (l >= 0.5) q = l + s - l * s;
            p = 2.0 * l - q;
            t[0] = h + 0.3333333;
            t[1] = h;
            t[2] = h - 0.3333333;
            for (var i = 0; i < 3; i++) {
                if (t[i] < 0) t[i] += 1.0;
                if (t[i] > 1) t[i] -= 1.0;
                if ((t[i] * 6) < 1) {
                    t[i] = p + ((q - p) * 6.0 * t[i]);
                } else if ((t[i] * 2.0) < 1) {
                    t[i] = q;
                } else if ((t[i] * 3.0) < 2) {
                    t[i] = p + (q - p) * ((2.0 / 3.0) - t[i]) * 6.0;
                } else t[i] = p;
            }
            r = t[0];
            g = t[1];
            b = t[2];
       }
      r = ((r > 1) ? 1 : ((r < 0) ? 0 : r));
      g = ((g > 1) ? 1 : ((g < 0) ? 0 : g));
      b = ((b > 1) ? 1 : ((b < 0) ? 0 : b));
      r = parseInt(r * 255);
      g = parseInt(g * 255);
      b = parseInt(b * 255);
      $("#r").val(r);
      $("#g").val(g);
      $("#b").val(b);
    }
    //计算并输出HSL的值
    function setHSL(r, g, b) {
        r = r / 255;
        g = g / 255;
        b = b / 255;
        var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
        l = (max + min) / 2;
        if (max == min) {
            h = s = 0;
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
            h = h / 6;
      }
      if (l >= 0 && l <= 0.5) {
          s = d / (2 * l);
      } else if (l > 0.5) {
          s = d / (2 - 2 * l);
      }
      $("#h").val(h.toFixed(2));
      $("#s").val(s.toFixed(2));
      $("#l").val(l.toFixed(2));
      //根据计算出的hsl值，重新设置色带色图
      $("#ribbonPoint").css("top", h * 300);
      mapX = mapY = (1 - l) * 299.768;
      $("#mapPoint").css({
          "left": mapX + 10,
          "top": mapY - 5
      });
    }
    //计算十六进制颜色代码
    function toCSSColor(ribbonY) {
      if (ribbonY >= 0 && ribbonY < 50) {
          r = "ff";
          g = parseInt(ribbonY * 5.1);
          b = "00";
      } else if (ribbonY >= 50 && ribbonY < 100) {
          ribbonY = ribbonY - 50;
          r = parseInt(255 - ribbonY * 5.1);
          g = "ff"
          b = "00"
      } else if (ribbonY >= 100 && ribbonY <= 150) {
          ribbonY = ribbonY - 100;
          r = "00";
          g = "ff";
          b = parseInt(ribbonY * 5.1);
      } else if (ribbonY >= 150 && ribbonY <= 200) {
          ribbonY = ribbonY - 150
          r = "00";
          g = parseInt(255 - ribbonY * 5.1);
          b = "ff";
      } else if (ribbonY >= 200 && ribbonY <= 250) {
          ribbonY = ribbonY - 200
          r = parseInt(ribbonY * 5.1);
          g = "00";
          b = "ff";
      } else if (ribbonY >= 50 && ribbonY <= 300) {
          ribbonY = ribbonY - 250
          r = "ff";
          g = "00";
          b = parseInt(255 - ribbonY * 5.1);
      }
    }
  }
})(jQuery);