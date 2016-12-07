
let population = [];
let matingPool = [];

const LIFE_SPAN = 250;
const POPULATION_SIZE = 200;
const MUTATION_RATE = 0.01;

const canvasSizeX = 640;
const canvasSizeY = 480;

let count = 0;

let target = undefined;

let frameCounter = undefined;
let generationCounter = undefined;
let highestFitness = undefined;

let generation = 1;

let obstacles = undefined;

// P5 Setup Function
function setup() {
    createCanvas(canvasSizeX, canvasSizeY);

    target = createVector(canvasSizeX/2, 10);

    frameCounter = createP(`<b>Frame:</b> ${0} / ${LIFE_SPAN}`);
    highestFitness = createP(`<b>Avg. Fitness:</b> 0`);
    generationCounter = createP(`<b>Generation:</b> ${generation}`);

    createP(`<b>Generation Size:</b> ${POPULATION_SIZE}`);
    createP(`<b>Mutation Rate:</b> ${MUTATION_RATE * 100}%`);

    obstacles = [
        new Obstacle(canvasSizeX/2 - 150, canvasSizeY/2 - 100, 320, 10),
        new Obstacle(canvasSizeX/2 + 150, canvasSizeY/2 + 50, 320, 10),
    ];

    for(let i = 0; i < POPULATION_SIZE; i++) {
        population[i] = new Rocket(new DNS());
    }
}

function draw() {
    background(51);

    if(count >= LIFE_SPAN) {
        count = 0;
        generation++;

        let highest = buildMatingPool();
        generateNewPopulation();

        highestFitness.html(`<b>Avg. Fitness:</b> ${highest}`);

        generationCounter.html(`<b>Generation:</b> ${generation}`);

    } else {
        for(let i = 0; i < POPULATION_SIZE; i++) {
            population[i].update(count);
            population[i].draw();
        }

        push();
        translate(target.x, target.y);
        ellipse(0, 0, 10, 10);
        pop();

        for(let i = 0; i < obstacles.length; i++) {
            obstacles[i].draw();
        }
    }

    frameCounter.html(`<b>Frame:</b> ${count} / ${LIFE_SPAN}`);

    count++;
}

function buildMatingPool() {
    matingPool = [];

    let avg = 0;

    for(let i = 0; i < POPULATION_SIZE; i++) {
        let f = population[i].fitness(target);

        avg += f;

        for(let j = 0; j < f; j++) {
            matingPool.push(population[i].dns);
        }
    }

    return avg/POPULATION_SIZE;
}

function generateNewPopulation() {

    let newPop = [];

    for(let i = 0; i < POPULATION_SIZE; i++) {
        let p1 = random(matingPool);
        let p2 = random(matingPool);

        let child = p1.crossover(p2);
        child.mutate();

        newPop[i] = new Rocket(child);
    }

    population = newPop;

}