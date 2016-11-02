window.App = window.App || {};

window.App.NewTerms = {
  initialize: function(){
    var $elem = $('#new_terms');
    var $closeButton = $elem.find('.button.close');
    var acceptNewTermsPath = $closeButton.data("url");
    
    if ($elem.length > 0) {
      var reveal = new window.Foundation.Reveal($elem);
      reveal.open();

      $closeButton.on('click', function () {
        $.post(acceptNewTermsPath).then(function () {
          reveal.close();
        });
      });
    }
  }
};
