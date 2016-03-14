window.App = window.App || {};

App.Menu = {
  initialize: function(){
    $(".toggle-menu").on('click', function(){
      $(this).parent('.main-menu').toggleClass('collapsed');
    });

    $(".proposal-filter-menu h2").on("click", function(){
      $(this).parent('.proposal-filter-menu').toggleClass('collapsed');
    });
  }
};
