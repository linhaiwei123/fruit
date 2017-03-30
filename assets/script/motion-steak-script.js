cc.Class({
    extends: cc.Component,

    properties: {
       motion: cc.MotionStreak,
    },

    onLoad: function () {
        //this.motion.enabled = false;
        //cc.find('Canvas').on('touchstart',this.onTouchStart,this);
        cc.find('Canvas').on('touchmove',this.onTouchMove,this);
        //cc.find('Canvas').on('touchend',this.onTouchEnd,this);
    },

    // onTouchStart: function(e){
    //     this.node.position = this.node.parent.convertToNodeSpaceAR(e.getLocation());
    // },

    // onTouchEnd: function(e){
    //     this.motion.enabled = false;
    // },

    onTouchMove: function(e){
        //this.motion.enabled = true;
        this.node.position = this.node.parent.convertToNodeSpaceAR(e.getLocation());
        // if(this._first){
        //     this._first = false;
        //    this.motion.reset();
        // }
    },

});
