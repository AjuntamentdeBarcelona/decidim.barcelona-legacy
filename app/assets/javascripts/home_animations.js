//= require scrollreveal

App.HomeAnimations = {
  initialize: function(){
    if(!$(".home-section")[0]){ return; }

    this.sr = ScrollReveal();
    this.animateTutorial();
    this.animateDownload();
    this.animateCategories();
  },

  animateTutorial: function(){
    var sr = this.sr;

    sr.reveal(".home-tutorial .tutorial-step-left .number", {
      delay: 200,
      origin: 'left'
    });

    sr.reveal(".home-tutorial .tutorial-step-right .number", {
      delay: 200,
      origin: 'right'
    });

    sr.reveal(".home-tutorial .tutorial-step-left .icons", {
      delay: 400,
      origin: 'top'
    });

    sr.reveal(".home-tutorial .tutorial-step-right .icons", {
      delay: 400,
      origin: 'top'
    });

    sr.reveal(".home-tutorial .tutorial-step-left .description", {
      delay: 300,
      origin: 'right'
    });

    sr.reveal(".home-tutorial .tutorial-step-right .description", {
      delay: 300,
      origin: 'left'
    });

    sr.reveal(".home-tutorial .line-overlay", {
      delay: 500,
      origin: 'top'
    });
  },

  animateDownload: function(){
    var sr = this.sr;

    sr.reveal(".home-section .download-buttons a:first-child", {
      delay: 100,
      origin: 'left'
    });

    sr.reveal(".home-section .download-buttons a:last-child", {
      delay: 300,
      origin: 'right'
    });

    sr.reveal(".home-section .download-buttons a:last-child", {
      delay: 300,
      origin: 'right'
    });
  },

  animateCategories: function(){
    var sr = this.sr;

    var categories = $(".home-section .categories > *");

    if(categories.length > 0){
      for(var i=1; i <=categories.length ; i++){
        var selector = ".home-section .categories .category_" + i;
        sr.reveal(selector, {delay: 100 * i, origin: 'top'});
      }
    }
  }
};
