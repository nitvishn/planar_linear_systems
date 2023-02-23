class SolutionCurve{

    constructor(x, y, f){
        this.tip = new Solution(x, y, f, false, false, false);
        this.tail = new Solution(x, y, f, false, false, false);
    }

    update(deltaTime){
        this.tip.update(deltaTime);
        this.tail.update(-deltaTime);
    }

    show(){
        this.tip.show();
        this.tail.show();
    }

}   