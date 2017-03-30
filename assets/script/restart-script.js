cc.Class({
    extends: cc.Component,

    properties: {
        _sceneLoading: false,
        scoreLabel: cc.Label,
    },

    
    onLoad: function () {
        this.scoreLabel.string = "得分：" + window.score;
        this.node.on('touchstart',this.onTouchStart,this)
    },

    onTouchStart: function(){
        if(!this._sceneLoading){
            this._sceneLoading = true;
            cc.director.loadScene('main-scene');
        }
    }
});
