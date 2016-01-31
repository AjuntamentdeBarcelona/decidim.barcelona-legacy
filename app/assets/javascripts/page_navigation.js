//= require jquery.visualNav
//= require jquery.sticky

App.PageNavigation = {
  initialize: function(){
    var menu = $(".page .menu");
    if(!menu[0]){ return; }

    menu.addClass('interactive-navigation');
    menu.visualNav({
      animationTime: 0,
      bottomMargin: 0,
      changed: function(visNav, selected){
        $("li ul li", menu).parent("ul").addClass('folded');
        $("li ul li.selected", menu).parent("ul").removeClass('folded');
      }
    });
    menu.sticky({ topSpacing: 20 });

    $("li.folded", menu).on('click', function(){
      $(this).toggleClass('folded');
    });
  }
};
