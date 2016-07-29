//= require jquery.browser
//= require jquery-iframe-auto-height

window.App = window.App || {};

App.Dataviz = {
  initialize: function(){
    $("iframe.autoheight").iframeAutoHeight({
      heightOffset: 150
    });
  }
};
