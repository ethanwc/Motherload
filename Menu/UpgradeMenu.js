class UpgradeMenu extends Menu {
    constructor(x, w) {
        super(AM.getAsset("./assets/img/menu_background.png"), x, w, width/2 - 1190/2, height/2-1080/2, 1190, 1080);
        this.img = undefined;
        this.items = [];
        this.text = [];
        this.basePrice = 1000;
        this.createMenuItems();
        this.currentCost = 0;

    }

    update() {
        super.update();
    }

    draw(ctx) {
        if (this.isEnabled) {
            this.drawMenu(ctx);
        }
    }

    createMenuItems() {
        let x = this.x + 20;
        let iconsize = 160;
        let header = new MenuItem(this, undefined, AM.getAsset("./assets/img/header_upgrade.png"), x + this.w/2 - 442/2, this.y + 50, 442, 59, this.dummyCallback);
        this.items.push(header);
        let exit = new MenuItem(this, undefined, AM.getAsset("./assets/img/menu_exit.png"), this.x + this.w - 135, this.y + 20, 100, 100, this.exit);
        this.items.push(exit);


        for (let row = 0; row < 7; row ++) {
            let yo = this.y + 160;
            for (let column = 0; column < 4; column ++) {
                let icon;
                let callback;
                switch(row) {
                    case 0:
                        //upgrade fuel capacity
                        icon = AM.getAsset("./assets/img/icon_ship.png");
                        callback = this.handleFuel;
                        break;
                    case 1:
                        //upgrade cargo capacity
                        icon = AM.getAsset("./assets/img/icon_hangar.png");
                        callback = this.handleHangar;
                        break;
                    case 2:
                        //upgrade health capacity
                        icon = AM.getAsset("./assets/img/icon_health.png");
                        callback = this.handleHealth;
                        break;
                    case 3:
                        //upgrade speed/acceleration
                        icon = AM.getAsset("./assets/img/icon_speed.png");
                        callback = this.handleSpeed;
                        break;
                    case 4:
                        //upgrade absorb range
                        icon = AM.getAsset("./assets/img/icon_dot1.png");
                        callback = this.handleAbsorb;
                        break;
                    case 5:
                        //upgrade explosion radius
                        icon = AM.getAsset("./assets/img/icon_dot2.png");
                        callback = this.handleExplosion;
                        break;
                    case 6:
                        //upgrade laser damage
                        icon = AM.getAsset("./assets/img/icon_damage.png");
                        callback = this.handleDamage;
                        break;
                }
                gameEngine.addEntity(new MenuItem(this, column, icon, x, yo, iconsize, iconsize, callback));

                // this.items.push(new MenuItem(this, icon, x, yo, iconsize, iconsize, callback));
                yo+= iconsize + 5;
            }
            x+= iconsize + 5;
        }
    }

    drawMenu(ctx) {
        // ctx.drawImage(this.background, this.x, this.y, this.w, this.h);

        for (let i = 0; i < this.items.length; i++) {
            let menuItem = this.items[i];
            menuItem.update();
            menuItem.draw(ctx);
            if (menuItem.text !== undefined) {
                ctx.font = "60px Arial";
                ctx.fillStyle = "white";
                ctx.fillText(menuItem.text, menuItem.x + menuItem.w/4 , menuItem.y + menuItem.h/2, menuItem.w);
            }
        }
        //draw cost and upgrade name of what is selected
        ctx.font = "60px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(this.currentCost, this.x + 40, this.y + 120, 400);
    }

    fullBuy() {
        info.updateBalance(500);
    }

    handleFuel(menuItem) {
        console.log("first call ", menuItem.level);

        if (info.balance >= menuItem.level * 100000) menuItem.img = AM.getAsset("./assets/img/icon_ship_selected.png");
        else  {
            let error = document.createElement("audio");
            error.src = "./assets/sound/menu_error.wav";
            error.play();
        }

    }

    handleHangar() {

    }

    handleExplosion () {

    }

    handleHealth() {

    }

    handleSpeed() {

    }

    handleAbsorb() {

    }

    dummyCallback() {

    }

    handleDamage() {

    }

    updateCost(level) {
        if (level === 0) this.currentCost = '$' + 1000000;
        else this.currentCost = '$' + 1000000 * (1 +level);
    }

    playError() {

    }

    exit(menuItem) {
        menuItem.menu.setTime();
    }


}