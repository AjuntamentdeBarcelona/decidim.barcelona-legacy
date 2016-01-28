//= require scrollreveal

App.HomeTutorial = {
  initialize: function(){
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
