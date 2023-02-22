// A basic sketch in p5.js that has a fulscreen canvas and a background color of black.

let gridSize = 20;

function f(t, x, y){
    return createVector(x, y);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
}

function draw() {

    background(0);
    stroke(255);
    for(var x = 0; x < windowWidth; x+=gridSize){
        for(var y = 0; y < windowHeight; y+=gridSize){
            var v = f(0, x, y);
            // draw an arrow from (x, y) to (v.x, v.y)
            line(x, y, x + 10, y + 10);
        }
    }

}