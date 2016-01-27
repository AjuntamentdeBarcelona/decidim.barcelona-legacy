App.Votes =

  hoverize: (selector, delegateTo) ->
    $(selector).on "mouseenter", delegateTo, ->
      $(this).find("div.anonymous-votes").show()
      $(this).find("div.organizations-votes").show()
      $(this).find("div.not-logged").show()
    $(selector).on "mouseleave", delegateTo, ->
      $(this).find("div.anonymous-votes").hide()
      $(this).find("div.organizations-votes").hide()
      $(this).find("div.not-logged").hide()

  initialize: ->
    App.Votes.hoverize $("#debates"), "div.votes"
    App.Votes.hoverize $("#proposals, #featured-proposals"), "div.supports"
    false
