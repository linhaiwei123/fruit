cc.Class({
    extends: cc.Component,

    properties: {
       itemPrefabArray: [cc.Prefab],
       speed: 400,
       g: -120,
       deltaNum: 0.2,
       currentNum: 1,
       delay: 3,
       spriteWait: cc.SpriteFrame,
       spriteExec: cc.SpriteFrame
    },

    throwAnim: function(){
        this.getComponent(cc.Sprite).spriteFrame =  this.spriteExec;
        this.scheduleOnce(function(){
            this.getComponent(cc.Sprite).spriteFrame =  this.spriteWait;
        }.bind(this),0.3);
    },

    onLoad: function () {
        this.generate();
        this.schedule(this.generate,this.delay);
    },

    generate: function(){
        this.throwAnim();
        this.currentNum += this.deltaNum;
        let realCurrentNum = Math.floor(this.currentNum);
        for(let i = 0; i < realCurrentNum; i++){
            let randomIdx = Math.random() > 0.5 ? 0: 1;
            let item = cc.instantiate(this.itemPrefabArray[randomIdx]);
            let randomVector = cc.pNormalize(cc.v2(cc.randomMinus1To1() * 0.35,1));
            item.parent = this.node.parent;
            item.position = this.node.position;
            item.getComponent('throw-item-script').init(cc.pMult(randomVector,this.speed),this.g);
            item.zIndex = this.node.zIndex - 1;
        }

    },

});
