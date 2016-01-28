//= require scrollreveal

App.HomeTutorial = {
  initialize: function(){
    if(!$(".home-tutorial")[0]){ return; }

    var sr = ScrollReveal();
    var options = {
      delay: 100,
      duration: 600,
      reset: true
    };

    sr.reveal(".home-tutorial .icons", options);
    sr.reveal(".home-tutorial .step-content", options);
    sr.reveal(".home-tutorial .line-overlay", options);
  }
};
