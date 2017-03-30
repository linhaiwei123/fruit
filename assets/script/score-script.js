cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label,
        _num: 0,
    },

    onLoad: function () {
        this.label.string = this._num;
        cc.find('Canvas').on('hit-good-soap',this.onHitGoodSoap,this)
    },

    onHitGoodSoap: function(){
        this._num += 10;
        this.label.string = this._num;
    },

});
