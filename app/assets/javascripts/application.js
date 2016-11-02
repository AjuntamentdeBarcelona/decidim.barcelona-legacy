// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery-ui/datepicker
//= require jquery-ui/datepicker-es
//= require turbolinks
//= require jquery.turbolinks
//= require foundation
//= require appendAround
//= require owl.carousel.min
//= require modernizr
//= require svg4everybody.min
//= require parallax
//= require moment
//= require moment/ca
//= require moment/es
//= require immutable
//= require social-share-button
//= require initial
//= require ahoy
//= require check_all_none
//= require ie_alert
//= require location_changer
//= require moderator_comment
//= require moderator_debates
//= require moderator_proposals
//= require participatory_process_selector
//= require prevent_double_submission
//= require gettext
//= require tags
//= require users
//= require i18n
//= require districts
//= require advanced_search
//= require react_ujs
//= require markerclusterer
//= require registration_form
//= require verification_form
//= require page_navigation
//= require menu
//= require share
//= require tracking
//= require votes
//= require dataviz
//= require bundle

var initialize_modules = function() {
  App.Users.initialize();
  App.Tags.initialize();
  App.LocationChanger.initialize();
  App.CheckAllNone.initialize();
  App.PreventDoubleSubmission.initialize();
  App.IeAlert.initialize();
  App.Districts.initialize();
  App.AdvancedSearch.initialize();
  App.RegistrationForm.initialize();
  App.PageNavigation.initialize();
  App.VerificationForm.initialize();
  App.Menu.initialize();
  App.Share.initialize();
  App.Votes.initialize();
  App.ParticipatoryProcessSelector.initialize();
  App.Dataviz.initialize();
};

$(function(){
  var locale = $("html").attr("lang");
  moment.locale(locale);

  Turbolinks.enableProgressBar();

  initialize_modules();

  $(document).foundation();
  $(".js-append").appendAround();

  $(document).on('ajax:complete', initialize_modules);
  $(document).on('ready page:load page:restore', function(){
    $('[data-parallax="scroll"]').parallax();
    $(window).trigger('resize').trigger('resize.px.parallax');
  });

  svg4everybody();
});

GoogleMapsAPI = $.Deferred();

function gmapsLoaded () {
  GoogleMapsAPI.resolve(google);
}

//Owl carousel for phase nav
$(document).ready(function() {

  //checks the active phase number before loading the carousel
  var activeSlide = $(".phase-nav__item.is-active").index();
  var widowWidth = $(window).width();
  var visibleSlides;
  
  if (widowWidth > 0 ){
    visibleSlides = 0;
  } 
  if (widowWidth > 479 ){
    visibleSlides = 1;
  }
  if (widowWidth > 830 ){
    visibleSlides = 2;
  }
  if (widowWidth > 1100 ){
    visibleSlides = 3;
  }

  $("[data-carousel]").owlCarousel({
    pagination: false,
    items: 4,
    itemsDesktop : [1199,4],
    itemsDesktopSmall : [1100,3],
    itemsTablet: [830,2],
    itemsTabletSmall: [600,1],
    itemsMobile : [479,1]
  });
  var owl = $("[data-carousel]");
  $(".next").click(function(){
    owl.trigger("owl.next");
  });
  $(".prev").click(function(){
    owl.trigger("owl.prev");
  });

  if(activeSlide > visibleSlides){
    owl.trigger('owl.jumpTo', activeSlide);
  }
});
