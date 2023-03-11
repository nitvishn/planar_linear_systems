// A basic sketch in p5.js that has a fulscreen canvas and a background color of black.

let gridSize = 25;
let normalizedLength = gridSize/2;
let xRange;
let yRange;
let zero;
let solutionPoints = [];
let solutionCurves = [];

function normalisedDifferenceVector(source, dest){
    var v = dest;
    var length = v.mag();
    v.x = v.x * normalizedLength / length;
    v.y = v.y * normalizedLength / length;
    return v
}

function p5ToCartesian(p5Vector){
    return createVector(p5Vector.x - zero.x, p5Vector.y - zero.y);
}

function f(t, X){
    // r = sqrt(X.x*X.x + X.y*X.y);
    // theta = Math.atan2(X.y, X.x);

    var r = X.x;
    var theta = X.y;

    r_prime = r - r**3;
    theta_prime = Math.sin(theta)**2 - 1;

    // x_prime = r * Math.sin(theta) * theta_prime;
    // y_prime = 

    // return createVector(r_prime * X.x / r - X.y, r_prime * X.y / r + X.x);

    console.log(r_prime, theta_prime);

    return createVector(r_prime, theta_prime);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    xRange = windowWidth / 2;
    yRange = windowHeight / 2;
    zero = createVector(windowWidth/2, windowHeight/2);
}

function convertPolarToCartesian(vec){
    return createVector(vec.x * Math.cos(vec.y), vec.x * Math.sin(vec.y));
}

function drawArrowAt(r, theta){

    var source = createVector(r, theta);
    var dest = f(0, source);

    source_cartesian = convertPolarToCartesian(source);
    dest_cartesian = convertPolarToCartesian(dest);

    v = normalisedDifferenceVector(source_cartesian, dest_cartesian);

    x = source_cartesian.x;
    y = source_cartesian.y;

    line(x, y, x + v.x, y + v.y);
}

function draw() {
    translate(windowWidth / 2, windowHeight / 2);
    background(0);
    stroke(100);
    strokeWeight(1);

    var max_r = 1000;

    for(var r = 0; r < max_r; r += 1){
        for(var theta = 0; theta < 2 * Math.PI; theta += 0.1){
            drawArrowAt(r, theta);
        }
    }

    // for(varx = -xRange; x < xRange; x+=gridSize){
    //     for(var y = -yRange; y < yRange; y+=gridSize){
    //         drawArrowAt(x, y);
    //     }
    // }

    // stroke(255);
    // strokeWeight(4);
    // drawArrowAt(mouseX - zero.x, mouseY - zero.y);
    // console.log(f(0, createVector(1, 0)))

    // for(var i = 0; i < solutionPoints.length; i++){
    //     solutionPoints[i].update(0.01);
    //     solutionPoints[i].show();
    // }

    // for(var i = 0; i < solutionCurves.length; i++){
    //     solutionCurves[i].update(0.01);
    //     solutionCurves[i].show();
    // }

    strokeWeight(1);
    // draw the y axis
    stroke(150)
    line(0, -yRange, 0, yRange);
    // draw the x axis
    line(-xRange, 0, xRange, 0);
    stroke(255);
}

function mousePressed(){
    solutionPoints.push(new Solution(mouseX - zero.x, mouseY - zero.y, f, false, true));
    // solutionCurves.push(new SolutionCurve(mouseX - zero.x, mouseY - zero.y, f));
}