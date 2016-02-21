    // Create the canvas
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 512;
    canvas.height = 480;
    document.body.appendChild(canvas);

    // Background image load
    var bgReady = false;
    var bgImage = new Image();
    bgImage.onload = function(){
        bgReady = true;
    }
    bgImage.src = "images/background.png";

    // Hero image
    var heroReady = false;
    var heroImage = new Image();
    heroImage.onload = function(){
        heroReady = true;
    }
    heroImage.src = "images/hero.png";

    //Monster image
    var monsterReady = false;
    var monsterImage = new Image();
    monsterImage.onload = function(){
        monsterReady = true;
    }
    monsterImage.src = "images/monster.png";

    // Game objects
    var hero = {
        speed:256 //256px/s移动
    }
    var monster = {};
    var monstersCaught = 0;

    // Keyboard controls
    var keysDown = {};

    addEventListener("keydown",function(e){
        keysDown[e.keyCode] = true;
    },false);

    addEventListener("keyup",function(e){
        delete keysDown[e.keyCode];
    },false);

    // Reset the game when catching
    var reset = function () {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    // Throw the monster somewhere on the screen randomly
    monster.x = 32 + (Math.random() * (canvas.width - 60));
    if (monster.x>448) {
        monster.x=448;
    };
    monster.y = 32 + (Math.random() * (canvas.height - 60));
    if (monster.y>416) {
        monster.y=416;
    };
};

    // update game objects
    var update = function(modifier){
        if (38 in keysDown) {//up
            hero.y -= hero.speed * modifier;
            if (hero.y<32) {
                hero.y=32;
            };
        };
        if (40 in keysDown) {//down
            hero.y += hero.speed * modifier;
            if (hero.y>416) {
                hero.y=416;
            };
        };
        if (37 in keysDown) {//left
            hero.x -= hero.speed * modifier;
            if (hero.x<32) {
                hero.x=32;
            };
        };
        if (39 in keysDown) {//right
            hero.x += hero.speed * modifier;
            if (hero.x>448) {
                hero.x=448;
            };
        };

        // touching?
        if (
            hero.x <= (monster.x + 32)
            && monster.x <= (hero.x + 32)
            && hero.y <= (monster.y + 32)
            && monster.y <= (hero.y + 32)
            ) {
            ++monstersCaught;
            reset();
        };
    }

    // draw 
    var render = function(){
        if (bgReady) {
            ctx.drawImage(bgImage,0,0);
        };

        if (heroReady) {
            ctx.drawImage(heroImage,hero.x,hero.y);
        };

        if (monsterReady) {
            ctx.drawImage(monsterImage,monster.x,monster.y);
        };
    // score
        ctx.fillStyle = "rgb(250,250,250)";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Goblins caught: "+ monstersCaught, 32, 32);
    }
    // the main game loop
    var main = function(){
        var now = Date.now();
        var delta = now - then;

        update(delta / 1000);
        render();

        then = now;
        // request to do this ASAP
        requestAnimationFrame(main);
    }
    // 兼容
    var w = window;
    requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.mswRequestAnimationFrame || w.mozRequestAnimationFrame;
    // play
    var then = Date.now();
    reset();
    main();