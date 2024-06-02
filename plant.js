class Plant {
    constructor(other, automata) {
        this.automata = automata
        this.gene = other.gene;
        this.maturity = 0;
        this.x = other.x;
        this.y = other.y;
    };

    update() {
        //The rate at which the plant grows each tick
        let growthRate = Math.abs(parseInt(document.getElementById("plantgrowth").value) - 79);

        //The value that determines when the plant is mature
        let maxMaturity = parseInt(document.getElementById("plantMature").value);
        //let maxMaturity = 80;

        if(this.maturity < maxMaturity) {//if plant isn't mature yet, add to its age
            this.maturity += maxMaturity / growthRate;
        } else { //if the plant has matured, it reproduces
            let offspring = this.mutate();

            if(!this.automata.plants[offspring.x][offspring.y]){//check if there is space to grow the offspring
                this.automata.plants[offspring.x][offspring.y] = new Plant(offspring, this.automata);
                this.maturity -= maxMaturity;
            }
        }

    };

    //Normalize() and Mutate() borrowed from Chris Marriott's Code at: https://github.com/algorithm0r/Evolving-Colors
    normalize(value, max) { 
		// return value >= max ? max-1 : value < 0 ? 0 : value; // no wrap
		return (value + max) % max; // wrap
	};

    mutate() {
		const newX = this.normalize(this.x - 1 + randomInt(3), PARAMETERS.dimension);
		const newY = this.normalize(this.y - 1 + randomInt(3), PARAMETERS.dimension);
		const newColor = this.normalize(this.gene - 10 + randomInt(21), 360);
		return{gene:newColor,x:newX,y:newY};
	};


    draw(ctx) {
        let hslColor = hsl(this.gene, 20 + this.maturity, 50);
		ctx.fillStyle = hslColor;
		ctx.strokeStyle = "dark gray";
		ctx.fillRect(this.x*PARAMETERS.size, this.y*PARAMETERS.size, PARAMETERS.size, PARAMETERS.size);
		ctx.strokeRect(this.x*PARAMETERS.size, this.y*PARAMETERS.size, PARAMETERS.size, PARAMETERS.size);
	};
};