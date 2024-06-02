class Animat {
    constructor(other, automata) {
        this.gene = other.gene;
        this.automata = automata;
        this.x = other.x;
        this.y = other.y;

        this.energy = 69;

    };

    update() {
        this.move();
        this.eat();
        this.reproduce();
        //kill the animat if it runs out of energy or random 1% chance
        if(this.energy < 1 || Math.random() < 0.01) {
            this.die();
        }
    };

    die() {
        this.isDead = true;
    };

    //Normalize(), Draw(), hueDifference(), and Mutate() borrowed from Chris Marriott's Code at: https://github.com/algorithm0r/Evolving-Colors
    normalize(value, max) { 
        // return value >= max ? max-1 : value < 0 ? 0 : value; // no wrap
        return (value + max) % max; // wrap
    };
    
     mutate() {
        const newX = this.normalize(this.x - 1 + randomInt(3), PARAMETERS.dimension);
        const newY = this.normalize(this.y - 1 + randomInt(3), PARAMETERS.dimension);
        const hue = this.normalize(this.gene - 10 + randomInt(21), 360);
        return{gene:hue,x:newX,y:newY};
    };
    hueDifference (plant) {
		let diff = plant ? Math.abs(this.gene - plant.gene) : 180;
		if (diff > 180) diff = 360 - diff; // now diff is between 0-180 and wraps 
		return (90 - diff) / 90;
	};


    move() {
        let x = this.x;
        let y = this.y;
        let bestDiff = Infinity;

        for(let col = -1; col < 2; col++) {
            let nX = this.normalize(this.x + col, PARAMETERS.dimension);
            for(let row = -1; row < 2; row++) {
                let nY = this.normalize(this.y + row, PARAMETERS.dimension);
                let tempDiff = Infinity;            
                if(this.automata.plants[nX][nY]) {
                    tempDiff = Math.abs(this.gene - this.automata.plants[nX][nY].gene)
                } else {
                    tempDiff = Math.abs(this.gene - Infinity);
                }
                //check if this difference is the best
                if(tempDiff < bestDiff) {
                    bestDiff = tempDiff;
                    x = nX;
                    y = nY;
                }
            }
        }
        this.x = x;
        this.y = y;
    };
    
    reproduce() {
        let requiredEn = parseInt(document.getElementById("animatReproduce").value);
        //let requiredEn = 80;
        if(this.energy > requiredEn) {
            this.energy -= requiredEn;
            this.automata.animats.push(new Animat(this.mutate(), this.automata));
        }
    }

    eat() {
        let growthRate = Math.abs(parseInt(document.getElementById("animatGrowth").value) - 79);
        let select = parseInt(document.getElementById("animatSelection").value);
        let target = this.automata.plants[this.x][this.y];
        let hueDifference = this.hueDifference(target);

        if(target) {
            if(hueDifference >= select) {
                this.automata.plants[this.x][this.y] = null;
                this.energy += 80 / growthRate * hueDifference;
            }
        }

    }

    draw(ctx) {
        ctx.fillStyle = hsl(this.gene,75,50);
		ctx.strokeStyle = "light gray";
		ctx.beginPath();
		ctx.arc((this.x + 1/2)*PARAMETERS.size, (this.y + 1/2)*PARAMETERS.size, PARAMETERS.size/2 - 1, 0, 2*Math.PI);
		ctx.fill();
		ctx.stroke();
    };
};