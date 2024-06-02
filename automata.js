class Automata {
    constructor(game) {
        //Object.assign(this,{game})
        this.plants = [];
        this.animats = [];

        for(let i = 0; i < PARAMETERS.dimension; i++) {
            this.plants.push([]);
            for(let j = 0; j < PARAMETERS.dimension; j++) {
                this.plants[i].push(null);
            }
        }
    };

    clearPlants() {
        for(let i = 0; i < PARAMETERS.dimension; i++) {
            for(let j = 0; j < PARAMETERS.dimension; j++) {
                this.plants[i][j] = null;
            }
        }
    }
    
    clearAnimats() {
        this.animats = []
    }

    clearAll() {
        this.clearPlants();
        this.clearAnimats();
    }

    addPlant() {
        let tx = randomInt(PARAMETERS.dimension);
		let ty = randomInt(PARAMETERS.dimension);
		this.plants[tx][ty] = new Plant({gene: randomInt(360), x:tx, y:ty}, this);
    }

    addAnimat() {
        let tx = randomInt(PARAMETERS.dimension);
		let ty = randomInt(PARAMETERS.dimension);
		this.animats.push(new Animat({gene: randomInt(360), x:tx, y:ty}, this));
    }

    update() {
        //Update all the plants
        for(let i = 0; i < PARAMETERS.dimension; i++) {
            for(let j = 0; j < PARAMETERS.dimension; j++) {
                if(this.plants[i][j]){
                    this.plants[i][j].update();
                    if(Math.random() < 0.01) {//random death chance
                        this.plants[i][j] = null;
                    }
                }
            }
        }
        //Update all the animats
        for(let a in this.animats) {
            if(!this.animats[a].isDead) {
                this.animats[a].update();
            } else {
                this.animats.splice(a,1);
            }
        }
    };

    draw(ctx) {
        for(let a in this.animats) {
            this.animats[a].draw(ctx);
        }
        for(let i = 0; i < PARAMETERS.dimension; i++) {
            for(let j = 0; j < PARAMETERS.dimension; j++) {
                if(this.plants[i][j]){
                    this.plants[i][j].draw(ctx);
                }
            }
        }
    };
    
};