function Obstacle(x, y, height, width) {
    this.position = createVector(x,y);
    this.size = createVector(height, width);

    this.draw = function() {
        push();
        rectMode(CENTER);
        translate(this.position.x, this.position.y);
        rect(0, 0, this.size.x, this.size.y);
        pop();
    };

    this.getBounds = function() {
        return new BoundingBox(this.position, this.size);
    }
}