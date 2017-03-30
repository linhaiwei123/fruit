cc.Class({
    extends: cc.Component,

    properties: {
        _g: -10,
        _speed: null,
        _points: null,
        breakPrefab: cc.Prefab,
        _solving: false,
    },

    init: function (initSpeed,g) {
        this._g = g;
        this._speed = initSpeed;
        this._points = this.getComponent(cc.PolygonCollider).points;
        cc.find('Canvas').on('touchmove',this.onTouchMove,this);
        cc.find('Canvas').on('touchstart',this.onTouchMove,this);
    },

    onTouchMove: function(e){
        if(this._solving){return;}
        if(this.checkTouch(e.getLocation())){
            this._solving = true;
            this.node.emit('touch');
            this.break();
            this.node.removeFromParent(true);
        }
    },

    break: function(){
        let randomRate = Math.random() * 0.5;
        let breakItemOne = cc.instantiate(this.breakPrefab);
        breakItemOne.getComponent('break-item-script').init(this,randomRate);
        let breakItemTwo = cc.instantiate(this.breakPrefab);
        breakItemTwo.getComponent('break-item-script').init(this,randomRate + 0.5);
    },

    checkTouch: function(location){
        let node = this.node;
        let pointInNode = node.convertToNodeSpaceAR(location);
        // if(pointInNode.x < -node.width/2 || pointInNode.x > node.width/2 || pointInNode.y > node.height/2 || pointInNode.y < -node.height/2){
        //     return false;
        // }
        
        let i, j, c = false;
        
        let nvert = this._points.length;
        let testx = pointInNode.x;
        let testy = pointInNode.y;
        let vert = this._points;
        
        for(i = 0, j = nvert - 1; i < nvert; j = i++){
            if ( ( (vert[i].y > testy) != (vert[j].y > testy) ) && 
                ( testx < ( vert[j].x - vert[i].x ) * ( testy - vert[i].y ) / ( vert[j].y - vert[i].y ) + vert[i].x ) ) 
                c = !c; 
        } 
        
        return c; 
    },

    update: function(dt){
        this._speed = cc.pAdd(this._speed,cc.v2(0,this._g * dt));
        this.node.position = cc.pAdd(this.node.position,cc.pMult(this._speed,dt));
        if(this.node.x < -480 || this.node.x > 480 || this.node.y > 320 || this.node.y < -320){
            if(!this._solving){
                this._solving = true;
                this.node.removeFromParent(true);
            }
        }
    },

});
