(function () {
    "use strict";

    Game.ScoresView = Backbone.View.extend({

        initialize : function () {
            this.listenTo(this.collection, "reset", this.render);
        },

        template : _.template("<% _.each(scores, function(score) { %> <tr class='<%= score.class %>' style='color:<%= score.color %>'><td><%= score.username %></td><td><%= score.score %></td><td><%= score.maxScore %></td></tr> <% }); %>"),

        render : function () {
            var scores = this.collection.toJSON();
            console.log(this.collection);
            _.each(scores, function (score) {
                
                score.class = score.username === Game.username ? "player" : "enemy";
                score.color = score.username === Game.username ? "#F3F3F3" : score.color;
                console.log(score);
            });
            scores = _.sortBy(scores, function (score) {
                return -score.maxScore;
            });
            this.$el.html(this.template({scores : scores}));
        }
    });

})();