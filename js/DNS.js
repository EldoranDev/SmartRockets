function DNS(genes) {

    this.genes = [];

    if(genes == undefined) {
        for(let i = 0; i < LIFE_SPAN; i++) {
            this.genes[i] = p5.Vector.random2D();
            //this.genes[i].setMag(0.1);
        }
    } else {
        this.genes = genes;
    }

    // Cross Over with an other gene pool
    this.crossover = function(dns) {

        let midpoint = floor(random(0, LIFE_SPAN));
        let newgenes = [];

        for(let i = 0; i < LIFE_SPAN; i++) {
            if(i < midpoint) {
                newgenes[i] = this.genes[i];
            } else {
                newgenes[i] = dns.genes[i];
            }
        }

        return new DNS(newgenes);
    };

    this.mutate = function() {
        for(var i = 0; i < this.genes.length; i++) {
            if(random(1) < MUTATION_RATE) {
                this.genes[i] = p5.Vector.random2D();
            }
        }
    };
}