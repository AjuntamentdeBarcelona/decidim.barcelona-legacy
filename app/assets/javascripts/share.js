window.App = window.App || {};

App.Share = {
  initialize: function(){
    var isMobile = /Android|iPhone|iPad|iPod/i.test( navigator.userAgent );

    if(isMobile) {
      $("html").addClass('is-mobile');
    }
  }
};
