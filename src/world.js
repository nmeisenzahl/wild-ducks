var world;

function buildWorld() {
var canvasElem = document.getElementById("game");
world = boxbox.createWorld(canvasElem);

world.createEntity({
                   name: "ground",
                   shape: "square",
                   type: "static",
                   color: "green",
                   width: 50,
                   height: .01,
                   y: 17
                   });

    var kiste = {
        name: "box",
        shape: "square",
        color: "brown",
        image: "box.png",
        imageOffsetX: -.38,
        imageOffsetY: -.53,
        imageStretchToFit: "true",
        density: 10,
        width: 1.5,
        height: 2,
        onImpact: function (entity, force) {
            if ((entity.name() === "fred" && force > 50) || force > 200) {
                this.destroy();
                incrementScore(20);
            }
        }
    };
    
    kiste.y = 16;

    world.createEntity(kiste, { x: 18.75 });
    world.createEntity(kiste, { x: 21.25 });
    world.createEntity(kiste, { x: 25.75 });
    world.createEntity(kiste, { x: 28.25 });

    kiste.y = 14;
    
    world.createEntity(kiste, { x: 18.75 });
    world.createEntity(kiste, { x: 21.25 });
    world.createEntity(kiste, { x: 25.75 });
    world.createEntity(kiste, { x: 28.25 });

    var deckel = {
                    name: "block",
                    shape: "square",
                    color: "brown",
                    image: "browntexture.png",
                    imageOffsetX: -1,
                    imageOffsetY: -0.13,
                    imageStretchToFit: true,
                    density: 30,
                    width: 4,
                    height: .5
                    };
    
    deckel.y = 12.75;
    
    world.createEntity(deckel, { x: 20 });
    world.createEntity(deckel, { x: 27 });
    
    world.createEntity({
                       name: "tonnenteddy",
                       shape: "square",
                       color: "yellow",
                       image: "tonnenteddy.png",
                       imageOffsetX: -0.5,
                       imageOffsetY: -0.9,
                       imageStretchToFit: true,
                       x: 20,
                       y: 10.75,
                       width: 2,
                       height: 3.5,
                       onImpact: function (entity, force) {
                           if ((entity.name() === "fred" && force > 50)) {
                               incrementScore(force);
                           }
                       }
    });

    world.createEntity({
                       name: "yellowelephant",
                       shape: "square",
                       color: "yellow",
                       image: "yellowelephant.png",
                       imageOffsetX: -.5,
                       imageOffsetY: -.55,
                       imageStretchToFit: true,
                       x: 27,
                       y: 11.4,
                       width: 2.2,
                       height: 2.2,
                       onImpact: function (entity, force) {
                           if ((entity.name() === "fred" && force > 50)) {
                               incrementScore(force);
                           }
                       }
    });
    
    var saeule = {
                name: "block",
                shape: "square",
                color: "brown",
                image: "browntexture.png",
                imageOffsetX: -.1,
                imageOffsetY: -1.0,
                imageStretchToFit: true,
                density: 30,
                width: .5,
                height: 4,
                onImpact: function (entity, force) {
                    if ((entity.name() === "fred" && force > 50) || force > 200) {
                        this.destroy();
                        incrementScore(10);
                    }
                }
    };

    saeule.y = 10.5;
    
    world.createEntity(saeule, { x: 18.25 });
    world.createEntity(saeule, { x: 21.75 });
    world.createEntity(saeule, { x: 25.25 });
    world.createEntity(saeule, { x: 28.75 });

    deckel.y = 8.25;
    
    world.createEntity(deckel, { x: 20 });
    world.createEntity(deckel, { x: 27 });
}
