class Solution{

    constructor(x, y, f, showTrail = true, decay = true, showPoint = true, trailLength = 10){
        this.history = [];
        this.position = createVector(x, y);
        this.f = f;
        this.currentTime = 0;
        this.trailLength = trailLength;
        this.showTrail = showTrail;
        this.decay = decay;
        this.showPoint = showPoint;
    }

    update(deltaTime){
        if(this.outOfBounds()){
            this.currentTime += deltaTime;
            return;
        }

        this.history.push([this.position.copy(), this.currentTime]);

        var K1 = this.f(this.currentTime, this.position).mult(deltaTime);
        var K2 = this.f(this.currentTime + deltaTime/2, this.position.add(K1.mult(0.5))).mult(deltaTime);
        var K3 = this.f(this.currentTime + deltaTime/2, this.position.add(K2.mult(0.5))).mult(deltaTime);
        var K4 = this.f(this.currentTime + deltaTime, this.position.add(K3)).mult(deltaTime);
        var deltaPosition = (K1 + 2*K2 + 2*K3 + K4)/6;
        var deltaPosition = K1.add(K2.mult(2)).add(K3.mult(2)).add(K4).div(6);
        this.currentTime += deltaTime;
        this.position.add(deltaPosition);
    }

    show(){

        stroke(255);

        if(this.showPoint){
            strokeWeight(4);
            point(this.position.x, this.position.y);
        }

        strokeWeight(1);
        var prev = this.position;
        var showingTrailLength = this.showTrail ? this.trailLength : this.history.length;
        for(var i = this.history.length - 1; i >= max(0, this.history.length - showingTrailLength); i--){
            if(this.decay){
                stroke(255, 255, 255, this.opacityFromRecentness(this.history[i][1]));
            }

            var pos = this.history[i][0];
            line(prev.x, prev.y, pos.x, pos.y);
            prev = pos;
        }

    }

    outOfBounds(){
        // return false;
        return this.position.x < -xRange || this.position.x > xRange || this.position.y < -yRange || this.position.y > yRange;
    }

    opacityFromRecentness(addedTime){ 
        if(this.currentTime == 0){
            return 255;
        }
        var difFraction = abs(this.currentTime - addedTime);
        var opacity = 255 * exp(-difFraction);
        return opacity;
    }

}