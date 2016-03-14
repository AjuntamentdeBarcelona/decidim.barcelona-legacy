window.App = window.App || {};

App.Tracking = App.Tracking || {};

App.Tracking.Facebook = {
  init: function(){
    $(document).on('ready page:load page:restore', function(){
      fbq('track', "PageView");
    });
  }
};
