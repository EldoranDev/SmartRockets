function Rocket(dns) {
    this.dns = dns;

    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);

    this.size = createVector(25, 5);
    this.position = createVector(canvasSizeX / 2, canvasSizeY);

    this.crashed = false;
    this.completed = false;

    this.alive = 0;

    this.orientation = dns.genes[0];

    this.draw = function () {
        push();
        noStroke();
        fill(255, 150);
        translate(this.position.x, this.position.y);
        rotate(this.velocity.heading());
        rectMode(CENTER);
        rect(0, 0, this.size.x, this.size.y);
        pop();
    };

    this.update = function (frame) {
        this.applyForce(this.dns.genes[frame]);
        this.orientation = this.dns.genes[frame];

        if (this.position.x > width || this.position.x < 0 || this.position.y <= 0) {
            this.crashed = true;
        }

        let distance = p5.Vector.dist(this.position, target);

        if (distance < 10) {
            this.completed = true;
            this.crashed = false;
            this.position = target.copy();
        }

        let bounds = this.getBoundingBox();

        for(let i = 0; i < obstacles.length; i++) {
            let b = obstacles[i].getBounds();

            if(b.collides(bounds)) {
                this.crashed = true;
            }
        }
    };

    this.getBoundingBox = function() {
        return new BoundingBox(this.position, this.size);
    };

    this.applyForce = function (vec) {
        this.acceleration.add(vec);

        if (!this.completed && !this.crashed) {
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            this.acceleration.mult(0);
            this.velocity.limit(4);
            this.alive++;
        }
    };

    this.fitness = function (target) {
        let distance = p5.Vector.dist(this.position, target);

        let fitness = map(distance, 0, height, height, 0);
        let timeScore = map((LIFE_SPAN - this.alive), 0, LIFE_SPAN, 1, 5);



        fitness *= ((!this.completed) ? 1 : timeScore);
        fitness *= (this.completed) ? 2 : 1;
        fitness *= (this.crashed) ? 0.5 : 1;

        if(fitness < 1){
            fitness = 1;
        }

        if (this.crashed) {
            fitness = fitness * 0.5;
        }

        return floor(fitness);
    }
}