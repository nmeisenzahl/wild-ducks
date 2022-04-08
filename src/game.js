_debug = $("#debug")[0];

InitDragDrop();
buildWorld();

_debug.innerHTML = "Started";

var _gameOffsetX = 0;
var _gameOffsetY = 0;
var _maxShots = 4;
var _score = $("#score")[0];
var _fredcount = $("#fredcount")[0];
var score = 0;

_fredcount.innerHTML = String(_maxShots - 1);

function shoot(player, startX, startY) {

    // current position to start flight
    var currentX = ExtractNumber(player.style.left);
    var currentY = ExtractNumber(player.style.top);

    // place player to old position and hide
    player.style.left = startX + 'px';
    player.style.top = startY + 'px';
    player.style.display = "none";

    // calculate direction
    var dirX = startX - currentX;
    var dirY = startY - currentY;

    _debug.innerHTML = '(' + currentX + ', ' + currentY + ', ' + dirX + ', ' + dirY + ')';

    fred = world.createEntity({
                       name: "fred",
                       shape: "circle",
                       radius: 1,
                       image: "AngryFred.png",
                       imageStretchToFit: true,
                       density: 5,
                       x: (currentX - _gameOffsetX + 30.0) / 30.0,
                       y: (currentY - _gameOffsetY + 30.0) / 30.0
    });
    
    if (--_maxShots > 0) {
        setTimeout(function () {
            fred.destroy();
            player.style.display = "block";
            _fredcount.innerHTML = String(_maxShots - 1);
        }, 7500);
    }

    fred.applyImpulse(10, dirX, dirY);
}

function incrementScore(points) {
    score += Math.floor(points);
    _score.innerHTML = score + ' Points';
}
