var originX = 999;
var originY = -1075;

$(function() {
    $(window).resize(function() {
        $("#canvas").height($(window).height());
        getCanvas();
    }).trigger('resize');
    $('#container').draggable({
        stop: function() {
            getCanvas()
        },
        drag: function(e, ui) {
            var zoom = $("#container").css('zoom');
            var factor = (1 / zoom) -1;

             ui.position.top += Math.round((ui.position.top - ui.originalPosition.top) * factor);
             ui.position.left += Math.round((ui.position.left- ui.originalPosition.left) * factor);
        }
    });
})

function getCanvas() {
    var x = -1 * Math.round($("#container").offset().left / 50);
    var y = -1 * Math.round($("#container").offset().top / 50);
    var w = Math.round($("#canvas").width() / 50);
    var h = Math.round($("#canvas").height() / 50);
    region(x, y, w, h);
}

function region(x, y, w, h) {
    for(var wi = x; wi < x + w; wi++) {
        for(var hi = y; hi < y + h; hi++) {
            put(wi, hi);
        }
    }
}

function put(x, y) {
    if($('#' + x + '-' + y).length) return;
    var cx = x * 50;
    var cy = y * 50;
    var px = x + originX;
    var py = y + originY;
    var src = "http://192.168.99.100/1608/" + px + ":" + py + "+s.png";
    var img = $("<img />").attr("src", src).css("left", cx).css("top", cy).attr('id', x + '-' + y).data('x', x).data('y', y);
    $("#container").append(img);
}