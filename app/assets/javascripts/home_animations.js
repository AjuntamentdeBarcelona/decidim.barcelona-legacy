//= require scrollreveal

window.App = window.App || {};

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
      origin: 'left'
    });

    sr.reveal(".home-tutorial .tutorial-step-right .number", {
      origin: 'right'
    });

    sr.reveal(".home-tutorial .tutorial-step-left .icons", {
      delay: 200,
      origin: 'top'
    });

    sr.reveal(".home-tutorial .tutorial-step-right .icons", {
      delay: 200,
      origin: 'top'
    });

    sr.reveal(".home-tutorial .tutorial-step-left .description", {
      delay: 100,
      origin: 'right'
    });

    sr.reveal(".home-tutorial .tutorial-step-right .description", {
      delay: 100,
      origin: 'left'
    });

    sr.reveal(".home-tutorial .line-overlay", {
      delay: 400,
      origin: 'top'
    });
  },

  animateDownload: function(){
    var sr = this.sr;

    sr.reveal(".home-section .download-buttons a:first-child", {
      origin: 'left'
    });

    sr.reveal(".home-section .download-buttons a:last-child", {
      delay: 200,
      origin: 'right'
    });

    sr.reveal(".home-section .download-buttons a:last-child", {
      delay: 200,
      origin: 'right'
    });
  },

  animateCategories: function(){
    var sr = this.sr;

    var categories = $(".home-section .categories > *");

    if(categories.length > 0){
      for(var i=1; i <=categories.length ; i++){
        var selector = ".home-section .categories .category_" + i;
        sr.reveal(selector, {delay: 100 * (i-1), origin: 'top'});
      }
    }
  }
};
