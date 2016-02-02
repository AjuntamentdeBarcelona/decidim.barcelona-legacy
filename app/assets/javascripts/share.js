//= require isMobile

App.Share = {
  initialize: function(){
    if(isMobile.android.device || isMobile.apple.device) {
      $("html").addClass('is-mobile');
    }
  }
}
