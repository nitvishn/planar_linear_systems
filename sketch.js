// A basic sketch in p5.js that has a fulscreen canvas and a background color of black.

let gridSize = 25;
let normalizedLength = gridSize/2;
let xRange;
let yRange;
let zero;
let solutionPoints = [];
let solutionCurves = [];

function normalisedDifferenceVector(source, dest){
    var v = dest.sub(source);
    var length = v.mag();
    v.x = v.x * normalizedLength / length;
    v.y = v.y * normalizedLength / length;
    return v
}

function p5ToCartesian(p5Vector){
    return createVector(p5Vector.x - zero.x, p5Vector.y - zero.y);
}

function f(t, X){
    return createVector(X.y, - X.x);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    xRange = windowWidth / 2;
    yRange = windowHeight / 2;
    zero = createVector(windowWidth/2, windowHeight/2);
}

function draw() {
    translate(windowWidth / 2, windowHeight / 2);
    background(0);
    stroke(100);
    for(var x = -xRange; x < xRange; x+=gridSize){
        for(var y = -yRange; y < yRange; y+=gridSize){
            var source = createVector(x, y);
            var dest = f(0, source);
            var v = normalisedDifferenceVector(source, dest);
            point(x, y);
            line(x, y, x + v.x, y + v.y);
        }
    }
    for(var i = 0; i < solutionPoints.length; i++){
        solutionPoints[i].update(0.01);
        solutionPoints[i].show();
    }

    for(var i = 0; i < solutionCurves.length; i++){
        solutionCurves[i].update(0.01);
        solutionCurves[i].show();
    }
    // draw the y axis
    stroke(255)
    line(0, -yRange, 0, yRange);
    // draw the x axis
    stroke(255);
    line(-xRange, 0, xRange, 0);
    stroke(255);
}

function mousePressed(){
    solutionPoints.push(new Solution(mouseX - zero.x, mouseY - zero.y, f, false, true));
    // solutionCurves.push(new SolutionCurve(mouseX - zero.x, mouseY - zero.y, f));
}