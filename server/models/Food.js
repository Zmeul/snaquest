Backbone = require('backbone');

var Food = Backbone.Model.extend({

    defaults : {
        x : 0,
        y : 0,
        type: 0
    },

    toJSON : function () {
        return {
            id  : this.cid,
            x   : this.attributes.x,
            y   : this.attributes.y,
            type: this.attributes.type
        };
    }

});

module.exports = Food;