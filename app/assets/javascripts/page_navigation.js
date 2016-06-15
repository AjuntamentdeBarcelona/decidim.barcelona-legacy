//= require jquery.visualNav
//= require jquery.sticky

window.App = window.App || {};

App.PageNavigation = {
  initialize: function(){
    var menu = $(".page .menu");
    if(!menu[0]){ return; }

    menu.sticky({ topSpacing: 20 });

    if($(menu).hasClass("visual")){
      menu.addClass('interactive-navigation');
      menu.visualNav({
        animationTime: 0,
        bottomMargin: 0,
        changed: function(visNav, selected){
          $("li ul li", menu).parent("ul").addClass('folded');
          $("li ul li.selected", menu).parent("ul").removeClass('folded');
        }
      });

      $("li.folded", menu).on('click', function(){
        $(this).toggleClass('folded');
      });
    }
  }
};
