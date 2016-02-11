App.Votes =

  hoverize: (selector) ->
    $(selector).on "mouseenter", "button", ->
      vote_box = $(this).parents(".votes, .vote-box");
      vote_box.find("div.anonymous-votes").show()
      vote_box.find("div.organizations-votes").show()
      vote_box.find("div.not-logged").show()
    $(selector).on "mouseleave", ".vote-box, .votes", ->
      $(this).find("div.anonymous-votes").hide()
      $(this).find("div.organizations-votes").hide()
      $(this).find("div.not-logged").hide()

  initialize: ->
    App.Votes.hoverize $("#debates, .debate-show")
    App.Votes.hoverize $("#proposals, #featured-proposals, .proposal-show")
    false
