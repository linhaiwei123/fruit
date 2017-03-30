cc.Class({
    extends: cc.Component,

    properties: {
        
    },


    onLoad: function () {
        this.node.on('touch',this.onTouch,this)
    },

    onTouch: function(){
        cc.find('Canvas').emit('hit-good-soap');
    }

});
