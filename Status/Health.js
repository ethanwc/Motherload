/*
Based on this:
https://www.html5canvastutorials.com/advanced/html5-canvas-animated-progress-bar/
 */
class Health {
    constructor(ship, initialHealth, x, y, w, h) {
        this.ship = ship;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.health = initialHealth;
        this.maxHealth = 100;
        this.previousHealth = this.health;
        // this.ctx = undefined;
        // this.bar = new Progressbar(x, y, w, h);
        this.handler = new ProgressbarHandler(ship, initialHealth, x, y, w, h, "transparent", "rgba(0,255,255,.3)");
        // grad.addColorStop(0, "transparent");
        // grad.addColorStop(1, "rgba(0,0,0,0.8)");

        // this.isDrawing = true;
        // this.counter = 0;
        // this.particles = [];
    }


    setHealth(newHealth) {
        this.health = newHealth;
    }

    setMaxHealth(newMaxHealth) {
        this.maxHealth = newMaxHealth;
    }

    hurt(damageTaken) {
        // this.previousHealth = this.health;
        // this.health -= damageTaken;
        // if (this.health < 0) this.health = 0;
        this.handler.hurt(damageTaken);
    }

    // fakeUpdate(ctx) {
    //
    //     for (let i = 0; i < this.particles.length; i++) {
    //         let p = this.particles[i];
    //         p.x -= p.vx;
    //         if (p.down === true) {
    //             p.g += 0.1;
    //             p.y += p.g;
    //         } else {
    //             if (p.g < 0) {
    //                 p.down = true;
    //                 p.g += 0.1;
    //                 p.y += p.g;
    //             } else {
    //                 p.y -= p.g;
    //                 p.g -= 0.1;
    //             }
    //         }
    //         p.draw(ctx);
    //     }
    // }

    // fakeDraw(ctx) {
    //     this.softReset(ctx);
    //     this.counter++;
    //     this.bar.hue += 0.7;
    //
    //     this.bar.widths += 2;
    //
    //     if (this.bar.widths > (this.health / this.maxHealth) * this.w) {
    //         this.isDrawing = false;
    //         this.bar.isDrawling = false;
    //         if (this.isDrawing) {
    //             if (this.counter > this.w / 2) {
    //                 this.hardReset(ctx);
    //             }
    //             this.bar.hue = 126;
    //             this.bar.widths = this.w;
    //             this.bar.draw(ctx);
    //         } else this.bar.draw(ctx);
    //     } else {
    //         this.bar.draw(ctx);
    //         for (let i = 0; i < 25; i += 10) {
    //             this.particles.push(new Particle(this.bar, this.x, this.y + this.h / 2 - 10));
    //         }
    //     }
    //     this.fakeUpdate(ctx);
    // }

    update() {
        //die event
        if (this.health < 0) ship.die();

        this.handler.update();

        // if (this.previousHealth !== this.health) {
            // this.handler.hurt(20);
        // }
        //     this.isDrawing = true;
        //     this.bar.widths = (this.health / this.maxHealth) * this.w;
        // }
    }

    draw(ctx) {
        this.handler.draw(ctx);
        // this.handler.d
        // if (this.isDrawing) this.fakeDraw(ctx);
        // else this.bar.draw(ctx);

    }

    // softReset(ctx) {
    //     let offset = this.h / 2 - 12;
    //     ctx.fillRect(this.x, this.y + offset, this.w, 25);
    // }
    //
    // hardReset(ctx) {
    //     this.softReset(ctx);
    //     this.bar.hue = 0;
    //     this.bar.widths = 0;
    //     this.counter = 0;
    //     this.particles = [];
    // }
}