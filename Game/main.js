//https://medium.com/techtrument/multithreading-javascript-46156179cf9a
//one thread for just collision detection?


/*
FUEL STATION
UPGRADE STATION
INFO DISPLAY (IN CAMERA)
FUEL MODEL. ECONOMY MODEL.
UFO PHYSICS spin faster bsaed on speed, reverse spin
ufo landing animation?
pause game while in upgrade menu
upgrade menu
scoring system
 */

let gameEngine = undefined;

AM.downloadAll(function () {
    let canvas = document.getElementById("gameWorld");
    let ctx = canvas.getContext("2d");

    document.getElementById("gameWorld").width = screen.width * .9;
    document.getElementById("gameWorld").height = screen.height * .9;


    gameEngine = new GameEngine();

    let assets = [];
    let tiles = [];

    assets.push(new Smoke(gameEngine, AM.getAsset("./assets/img/smoke.png"), 1000, 0));
    assets.push(new Boom(gameEngine, AM.getAsset("./assets/img/boom.png"), 1200, 0));
    assets.push(new EnergyBall(gameEngine, AM.getAsset("./assets/img/energyball.png"), 100, 200));
    assets.push(new Heart(gameEngine, AM.getAsset("./assets/img/heart.png"), 300, 0));

    assets.push(new Blackhole(gameEngine, AM.getAsset("./assets/img/blackhole.png"), 500, 500, 1/2));
    assets.push(new Magnet(gameEngine, AM.getAsset("./assets/img/magnet.png"), 450, 450, 2));


    let ship = new Ufo(gameEngine, AM.getAsset("./assets/img/ufo.png"), 0, 0);
    let camera = new Camera(ship);
    gameEngine.init(ctx, camera);
    gameEngine.start();


    let worldWidth = 100;
    let worldHeight = 150;


    genworld(gameEngine, worldWidth, worldHeight, tiles);




    for (let i = 0; i < tiles.length; i++) {
        gameEngine.addEntity(tiles[i]);
    }

    for (let i = 0; i < assets.length; i++) {
        gameEngine.addEntity(assets[i]);
    }

    gameEngine.addEntity(ship);

});