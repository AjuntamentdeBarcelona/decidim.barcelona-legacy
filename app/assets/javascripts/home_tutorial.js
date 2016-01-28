//= require scrollreveal

App.HomeTutorial = {
  initialize: function(){
    if(!$(".home-tutorial")[0]){ return; }

    var sr = ScrollReveal();

    sr.reveal(".home-tutorial .tutorial-step-left .number", {
      delay: 0,
      origin: 'left'
    });

    sr.reveal(".home-tutorial .tutorial-step-right .number", {
      delay: 0,
      origin: 'right'
    });

    sr.reveal(".home-tutorial .tutorial-step-left .icons", {
      delay: 300,
      origin: 'right'
    });

    sr.reveal(".home-tutorial .tutorial-step-right .icons", {
      delay: 300,
      origin: 'left'
    });

    sr.reveal(".home-tutorial .tutorial-step-left .description", {
      delay: 500,
      origin: 'right'
    });

    sr.reveal(".home-tutorial .tutorial-step-right .description", {
      delay: 500,
      origin: 'left'
    });

    sr.reveal(".home-tutorial .line-overlay", {
      delay: 500,
      origin: 'top'
    });
  }
};
