App.Share = {
  initialize: function(){
    var isMobile = /AndroidiPhone|iPad|iPod/i.test( navigator.userAgent );

    if(isMobile) {
      $("html").addClass('is-mobile');
    }
  }
};
