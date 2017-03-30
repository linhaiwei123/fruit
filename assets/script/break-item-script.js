cc.Class({
    extends: cc.Component,

    properties: {
        _g: null,
        breakDrag: 0.3,
        _speed: null,
        _solving: false,
    },

    init: function (throwItemScript,rate) {
        //let spriteComponent = cc.instantiate(throwItemScript.getComponent(cc.Sprite));
        this.node.color = throwItemScript.node.color;
        this._g = throwItemScript._g;
        let originSpriteComponent = throwItemScript.node.getComponent(cc.Sprite);
        let selfSpriteComponent = this.node.getComponent(cc.Sprite);
        selfSpriteComponent.fillStart = rate;
        selfSpriteComponent.spriteFrame = originSpriteComponent.spriteFrame;
        //let spriteRef = this.node.addComponent(cc.Sprite);
        //spriteRef = spriteComponent;
        //spriteComponent.node = this.node;
        this.node.parent = throwItemScript.node.parent;
        this.node.position = throwItemScript.node.position;
        //spriteComponent.fillStart = rate;
        //spriteComponent.fillRange = 0.5;
        this._speed = cc.pMult(cc.pForAngle((360 * rate - 180) * Math.PI / 180),throwItemScript._speed.mag() * this.breakDrag);
        this._speed = cc.v2(this._speed.y,-this._speed.x);
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
