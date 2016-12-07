function BoundingBox(pos, size) {
    this.x = pos.x - (size.x / 2);
    this.y = pos.y - (size.y / 2);

    this.width = size.x;
    this.height = size.y;

    this.collides = function (box) {
        return (
            this.x < box.x + box.width &&
            this.x + this.width > box.x &&
            this.y < box.y + box.height &&
            this.y + this.height > box.y
        );
    }
}
