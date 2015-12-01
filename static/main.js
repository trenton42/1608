var originX = 999;
var originY = -1075;
var posX = 0;
var posY = 0;
var tileSize = 513;
var drawn = {};
var ctx;
var moveSpeed = 20;

$(function() {
    var canvas = document.getElementById("container")
    ctx = canvas.getContext("2d")
    $(document).keydown(function(e) {
        // From http://stackoverflow.com/a/6011119/999844
        switch(e.which) {
            case 37: // left
            posX -= moveSpeed;
            break;

            case 38: // up
            posY -= moveSpeed;
            break;

            case 39: // right
            posX += moveSpeed;
            break;

            case 40: // down
            posY += moveSpeed;
            break;

            default: return;
        }
        getViewable();
        e.preventDefault();
    });
    $(window).bind('mousewheel DOMMouseScroll', function(event){
        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            tileSize -= 5;
            if(tileSize <= 100) tileSize = 100;
        } else {
            tileSize += 5;
            if(tileSize >= 513) tileSize = 513;
        }
        event.preventDefault();
        getViewable();
    });
    $(window).resize(function() {
        $("#canvas").height($(window).height());
        $("#container").height($(window).height());
        $("#container").width($(window).width());
        var canvas = document.getElementById("container");
        canvas.width = $(window).width();
        canvas.height = $(window).height();
        getViewable();
    }).trigger('resize');
    $("#container").on('mousedown', function(e) {
        $(this).addClass('dragging');
        $(this).data('startX', e.offsetX).data('startY', e.offsetY);
    }).on('mouseup', function() {
        $(this).removeClass('dragging');
    })
    $(document).on('mousemove', '.dragging', function(e) {
        var nX = e.offsetX - $(this).data('startX');
        var nY = e.offsetY - $(this).data('startY');
        posX -= nX;
        posY -= nY;
        $(this).data('startX', e.offsetX);
        $(this).data('startY', e.offsetY);
        getViewable();
    })
})

function drawTile(tileX, tileY) {
    var x = (tileX - originX) * tileSize - posX;
    var y = (tileY - originY) * tileSize - posY;
    var src = "/1608/" + tileX + ":" + tileY + "+s.png";
    if(drawn[src]) {
        ctx.drawImage(drawn[src], x, y, tileSize, tileSize);
        return;
    }

    var img = new Image();
    img.onload = function() {
        drawn[src] = img;
        ctx.drawImage(img, x, y, tileSize, tileSize);
    }
    img.src = src;
}

function getViewable() {
    var w = $('#container').width();
    var h = $('#container').height();

    var startTileX = Math.floor(posX / tileSize) + originX;
    var startTileY = Math.floor(posY / tileSize) + originY;
    var endTileX = Math.ceil((posX + w) / tileSize) + originX;
    var endTileY = Math.ceil((posY + h) / tileSize) + originY;
    for(var x = startTileX; x < endTileX; x++) {
        for(var y = startTileY; y < endTileY; y++) {
            drawTile(x, y);
        }
    }
}