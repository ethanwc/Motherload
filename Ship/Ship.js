class Ship {
    constructor(game, animation, x, y, w, h) {
        // super(game, new Animation(spritesheet, 0, 0, 540, 584, 3, .1, 10, true), x, y, 540, 584);

        this.game = game;
        this.moveAnimation = animation;
        this.idleAnimation = new Animation(AM.getAsset("./assets/img/ship_idle_1.png"), 0, 0, 540, 581, 3, .3, 10, true);
        this.fireAnimation = new Animation(AM.getAsset("./assets/img/ship_attack_2.png"), 0, 0, 540, 580, 3, .2, 10, true);
        this.landAnimation = new Animation(AM.getAsset("./assets/img/ship_land.png"), 0, 0, 540, 582, 1, .2, 1, true);
        this.landingDeploy = new Animation(AM.getAsset("./assets/img/ship_landing_deploy.png"), 0, 0, 540, 582, 4, .1, 10, true, true);
        this.landingRetract = new Animation(AM.getAsset("./assets/img/ship_landing_deploy.png"), 0, 0, 540, 582, 4, .1, 10, true, false);
        this.dieAnimation = new Animation(AM.getAsset("./assets/img/ship_death.png"), 0, 0, 540, 541, 3, .1, 10, true, true);
        this.deathAnimation = new Animation(AM.getAsset("./assets/img/ship_dead.png"), 0, 0, 540, 541, 1, .1, 1, true, true);
        this.animation = this.idleAnimation;
        this.removeFromWorld = false;

        //landing, landed, taking off animations
        this.maxspeed = 1000;
        this.landingSpeed = 200;
        this.speed = this.maxspeed;
        this.maxSpeedConstant = this.maxspeed;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.hv = 0;
        this.vv = 0;
        this.ha = 0;
        this.va = 0;
        this.prevx = 0;
        this.prevy = 0;
        this.move = 0;
        this.landingGear = 0;
        this.landingStart = 0;
        this.swapAnimation = 0;
        this.waitTime = 10 * .1 - .1;
        this.flySize = 130;
        this.landSize = 100;
        this.deathTime = 0;
        this.deathWaitTime = 1;
        this.landed = 0;
        this.isAlive = 1;
        this.r = this.flySize;
        this.isAbsorbing = false;
        this.burstTime = 0;
        this.burstCoolDown = 8;
        this.missileTime = 0;
        this.missileCoolDown = 3;
        this.lastLandTime = 0;
        this.landWaitTime = 5;

    }

    toggleAbsorb() {
        if (this.isAlive)
            this.isAbsorbing = !this.isAbsorbing;
    }

    toggleLanding() {

        if (this.isAlive) {

            if ((gameEngine.timer.gameTime - this.landingStart) > this.waitTime) {

                //already checks if idle or move should occur? just need time in between other animations check
                this.landingGear = !this.landingGear;


                if (this.landingGear) {
                    this.r = this.landSize;
                    this.animation = this.landingRetract;
                    this.maxspeed = this.landingSpeed;
                }

                else {
                    this.r = this.flySize;
                    this.animation = this.landingDeploy;
                    this.maxspeed = this.maxSpeedConstant;

                }

                this.swapAnimation = 1;
                this.landingStart = gameEngine.timer.gameTime;
            }
        }
    }

    die() {
        if (this.isAlive) {
            this.isAlive = 0;
            if (this.isAbsorbing) this.isAbsorbing = false;
            gameEngine.addEntity(new GreenExplosion(this.game, AM.getAsset("./assets/img/greenexplosion.png"), this.x - 150 * shipscale, this.y - 120 * shipscale));
            this.animation = this.dieAnimation;
            this.deathTime = gameEngine.timer.gameTime;
            alarm.pause();
            deathMenu.isEnabled = true;
            playShipDeath();
        }
    }

    update() {

        if (this.isAlive) {

            let ship_btm = this.y + this.h / 2 - 45 - 1500 + 376;
            if (!this.landed && this.landingGear && (ship_btm < 2 && ship_btm > -2) && this.hv < 1) {

                if ((gameEngine.timer.gameTime - this.lastLandTime) > this.landWaitTime) {
                    land.play();
                    this.lastLand = gameEngine.timer.gameTime;
                }
                this.landed = true;


            }


            if (this.landed && (this.vv > 2 || this.hv > 2)) this.landed = false;



            if ((gameEngine.timer.gameTime - this.landingStart) > this.waitTime) {

                if (!this.swapAnimation && this.animation !== this.landAnimation) {
                    if (Math.abs(this.hv) < 100 && Math.abs(this.vv) < 100) {
                        if (this.move) {
                            this.animation = this.idleAnimation;
                            this.move = 0;
                        }
                    } else if (!this.move) {
                        this.move = 1;
                        this.animation = this.moveAnimation;
                    }

                }

                else {
                    this.swapAnimation = !this.swapAnimation;
                    if (this.animation === this.landingDeploy) {
                        this.resetAnimation(this.landingDeploy);
                        this.animation = this.idleAnimation;
                    }
                    else if (this.animation === this.landingRetract) {
                        this.resetAnimation(this.landingRetract);
                        this.animation = this.landAnimation;
                    }

                }
            }

            this.prevx = this.x;
            this.prevy = this.y;

            this.hv += this.game.clockTick * this.ha;
            this.vv += this.game.clockTick * this.va;

            if (this.hv > this.maxspeed) this.hv = this.maxspeed;
            if (this.hv < -1 * this.maxspeed) this.hv = -1 * this.maxspeed;

            if (this.vv > this.maxspeed) this.vv = this.maxspeed;
            if (this.vv < -1 * this.maxspeed) this.vv = -1 * this.maxspeed;

            if (this.ha === 0) this.hv *= .97;
            if (this.va === 0) this.vv *= .97;

            this.x += this.game.clockTick * this.hv;
            this.y += this.game.clockTick * this.vv;

            if (this.x < 0) this.x = 1;
            if (this.y < 0) this.y = 1;

            if (this.x + this.w/2 * shipscale > xcap) this.x = (xcap - this.w/2 * shipscale - 1);
            if (this.y + this.h/2 *shipscale > ycap) this.y = (ycap - this.h/2 * shipscale -1);



            for (let i = 0; i < gameEngine.entities.length; i++) {

                let entity = gameEngine.entities[i];

                if (entity instanceof Tile && entity.foreground) {
                    if (RectCircleColliding(this.x + this.w * .25 * shipscale, this.y + this.h * .25 * shipscale,
                            this.r * shipscale, entity.x, entity.y, entity.w, entity.h)) {
                        this.x = this.prevx;
                        this.y = this.prevy;

                        if (!this.landingGear) {
                            if (!(entity.health > 1000)) {
                                health.hurt(10);
                                playHitSomething();
                            }
                            else ship.y -= 4;
                            entity.hitByShip();
                            gameEngine.addEntity(new Boom(gameEngine, AM.getAsset("./assets/img/boom.png"),
                                entity.x - 70, entity.y - 66));//c

                            this.hv = -.3 * this.hv;
                            this.vv = -.3 * this.vv;
                        }

                    }
                }
            }
        }

        else if ((gameEngine.timer.gameTime - this.deathTime) > this.deathWaitTime){
            this.animation = this.deathAnimation;
        }
    }

    shootMissile() {
        if (!ship.landingGear)
            if (this.isAlive) {
                if ((gameEngine.timer.gameTime - this.landingStart) > this.waitTime) {
                    if (gameEngine.timer.gameTime - this.missileTime > this.missileCoolDown) {
                        gameEngine.addEntity(new Missile(gameEngine, mouse.x, mouse.y));
                        this.animation = this.fireAnimation;
                        this.shootstart = gameEngine.timer.gameTime;
                        this.missileTime = gameEngine.timer.gameTime;
                    }
                    else {
                        notyet.play();
                    }
                }
            }
    }

    shootLaser() {
        if (!ship.landingGear)
            if (this.isAlive) {
                gameEngine.addEntity(new Beam(gameEngine, ship.x + (ship.w / 3 + (55*shipscale)) * ship.animation.scaleBy - camera.x, ship.y + ship.h * ship.animation.scaleBy - 20 - camera.y));
                gameEngine.addEntity(new Beam(gameEngine, ship.x + (ship.w / 3 + (120*shipscale) + 40) * ship.animation.scaleBy - camera.x, ship.y + ship.h * ship.animation.scaleBy - 20 - camera.y));
                let laser_beam_fire = document.createElement("audio");
                laser_beam_fire.src = "./assets/sound/laser4.mp3";
                laser_beam_fire.play();
            }
    }

    burst() {
        if (!ship.landingGear)
            if (this.isAlive) {
                if (gameEngine.timer.gameTime - this.burstTime > this.burstCoolDown) {
                    gameEngine.addEntity(new EnergyBall(gameEngine, AM.getAsset("./assets/img/energyball.png"),
                        ship.x - 160 * shipscale, ship.y - 40));
                    let burst = document.createElement("audio");
                    burst.src = "./assets/sound/burst1.wav";
                    this.burstTime = gameEngine.timer.gameTime;
                    burst.play();
                }
                else {
                    //too soon for missile noise
                    notyet.play();
                }
            }
    }

    resetAnimation(animation) {

        animation.elapsedTime = 0;
    }



    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1/2 * shipscale);
    }
}