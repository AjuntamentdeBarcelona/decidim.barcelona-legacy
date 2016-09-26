window.App = window.App || {}

App.Districts =

  initialize: ->
    this.form = $('.new_proposal, .edit_proposal, .new_meeting, .edit_meeting, .new_action_plan, .edit_action_plan, .new_participatory_process, .edit_participatory_process')
    this.districtSelect = this.form.find('#proposal_district, #meeting_district, #action_plan_district, #participatory_process_district')
    this.scopeRadio = this.form.find('.scope-radio input')
    this.scopeRadio.on('change', (event) => this.checkDistrictSelectVisibility(event.target.value))

    currentScope = this.scopeRadio.filter((index, radio) => $(radio).attr('checked'))

    if currentScope.length > 0
      this.checkDistrictSelectVisibility(currentScope[0].value)

  checkDistrictSelectVisibility: (scope) ->
    this.districtSelect.attr('disabled', scope == 'city')

